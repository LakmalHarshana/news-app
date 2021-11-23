import React, { useState, useEffect } from "react";
import useFetch from "../services/newsService";
import PageHeader from "../components/PageHeader";
import { Paper, makeStyles, InputAdornment, Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Search } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      margin: "0px",
      marginBottom: "15px",
      padding: theme.spacing(2),
    },
  },
}));

export default function NewsBlog(props) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const date = new Date();
  const [start, setStart] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [end, setEnd] = useState(new Date());
  const [params, setParams] = useState({
    offset: 0,
    limit: rowsPerPage,
    start: start,
    end: new Date().toISOString(),
  });
  const handleDateChange = (event) => {
    const date = event.target.value.toISOString();
    const param = event.target.name;
    if (param === "start") setStart(event.target.value);
    if (param === "end") setEnd(event.target.value);
    setParams({
      ...params,
      [param]: date,
      offset: 0,
      limit: rowsPerPage,
    });
  };

  const history = useHistory();
  const [{ data, isLoading, count, error }] = useFetch("get", "/news", params);
  useEffect(() => {
    if (error === "Request failed with status code 401") {
      history.push("/login");
    }
  }, [error]);
  const changeSearchText = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    setParams({
      ...params,
      title: searchText,
    });
  };
  const resetSearch = () => {
    setSearchText("");
    setParams({
      ...params,
      title: null,
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    setParams({
      ...params,
      offset: (value - 1) * rowsPerPage,
      limit: rowsPerPage,
    });
  };

  return (
    <>
      <PageHeader
        title="News Blog"
        subTitle="Our News Articles"
        icon={<DashboardIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Controls.DatePicker
              name="start"
              label="Start Date"
              value={start}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controls.DatePicker
              name="end"
              label="End Date"
              value={end}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controls.Input
              label="Search News"
              value={searchText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    {searchText && (
                      <IconButton onClick={resetSearch}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton onClick={handleSearch}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={changeSearchText}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {data &&
          data.map((news) => (
            <Grid item xs={12} md={4} key={news.id}>
              <NewsCard
                image={news.urlToImage}
                title={news.title}
                description={news.description}
                id={news.id}
              />
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={page}
        count={(+count / rowsPerPage).toFixed(0)}
        handlePageChange={handlePageChange}
      />
      <Loading isLoading={isLoading} />
    </>
  );
}
