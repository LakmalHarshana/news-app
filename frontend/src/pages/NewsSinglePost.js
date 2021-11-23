import React, { useEffect } from "react";
import useFetch from "../services/newsService";
import PageHeader from "../components/PageHeader";
import { Grid } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import AssignmentIcon from "@material-ui/icons/Assignment";
import NewsSingle from "./../components/NewsSingle";

export default function NewsSinglePost(props) {
  const { id } = useParams();
  const history = useHistory();
  const [{ data, isLoading, error }] = useFetch("get", `/news/${id}`);
  useEffect(() => {
    if (error === "Request failed with status code 401") {
      history.push("/login");
    }
  }, [error]);
  return (
    <>
      <PageHeader
        title="News in Details"
        subTitle="News details"
        icon={<AssignmentIcon fontSize="large" />}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NewsSingle news={data} />
        </Grid>
      </Grid>
      <Loading isLoading={isLoading} />
    </>
  );
}
