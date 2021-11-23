import React from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as newsService from "../services/newsService";

const date = new Date();
const initialFValues = {
  apiKey: "d6da863f882e4a1a89c5152bd3692fb6",
  pageSize: 100,
  page: 1,
  sources: "abc-news",
  sortBy: "",
  to: new Date(),
  from: new Date(date.getFullYear(), date.getMonth(), 1),
};

export default function NewsFilterForm(props) {
  const { fetchNews, filter = false } = props;

  const { values, setValues, handleInputChange, resetForm } =
    useForm(initialFValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Controls.DatePicker
            name="from"
            label="From"
            value={values.from}
            onChange={handleInputChange}
          />
          <Controls.DatePicker
            name="to"
            label="To"
            value={values.to}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {filter && (
            <Controls.Select
              name="category"
              label="Category"
              value={values.category}
              onChange={handleInputChange}
              options={newsService.getCategoriesCollection()}
            />
          )}
          <Controls.Select
            name="sortBy"
            label="Sort By"
            value={values.sortBy}
            onChange={handleInputChange}
            options={newsService.getSortByOptions()}
          />
          <div>
            <Controls.Button type="submit" text="Import" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
