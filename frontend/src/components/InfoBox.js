import React from "react";
import { Paper, Card, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(2),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(2),
    "& .MuiTypography-subtitle2": {
      opacity: "0.9",
    },
    [theme.breakpoints.down("xs")]: {
      "& .MuiTypography-h6": { fontSize: "1.0rem !important" },
    },
  },
}));

export default function InfoBox(props) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;
  return (
    <Paper
      elevation={3}
      square
      className={classes.root}
      style={{ backgroundColor: "#f7f7fd" }}
    >
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
