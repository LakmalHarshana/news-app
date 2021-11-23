import React, { useState, useEffect } from "react";
import NewsFilterForm from "../components/NewsFilterForm";
import MUIDataTable from "mui-datatables";
import PageHeader from "../components/PageHeader";
import {
  Paper,
  makeStyles,
  Toolbar,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { Send } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import ConfirmDialog from "../components/ConfirmDialog";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

export default function NewsList(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("Import News");
  const [recordForEdit, setRecordForEdit] = useState(null);

  // console.log(
  //   "process.env.API_URL",
  //   process.env.REACT_APP_API_URL,
  //   process.env.REACT_APP_NEWS_API_KEY
  // );
  const [data, setData] = useState([["no imported news"]]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (error === "Request failed with status code 401") {
      history.push("/login");
    }
  }, [error]);

  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const fetchNews = async function (values) {
    // const mergedObj = { ...params, ...values };
    setIsLoading(true);
    const abortController = new AbortController();
    await axios({
      method: "get",
      url: "https://newsapi.org/v2/everything",
      signal: abortController.signal,
      params: values,
    })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setData(res.data.articles);
        setOpenPopup(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          // auto catches network / connection error
          setIsLoading(false);
          setOpenPopup(false);
          setError(err.message);
          // console.log(err.message);
          setNotify({
            isOpen: true,
            message: err.message,
            severity: "error",
            title: "Error",
          });
        }
      });
  };

  const createNews = async (data) => {
    if (data[0][0] === "no imported news") {
      setNotify({
        isOpen: true,
        message: "No imported news to save",
        severity: "error",
        title: "Error",
      });
    } else {
      setIsLoading(true);
      const abortController = new AbortController();
      const token = `Bearer ${localStorage.getItem("authToken")}`;
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const res = await axios({
        method: "post",
        url: "/api/v1/news",
        signal: abortController.signal,
        data: { data },
      })
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            severity: "success",
            title: "Success",
          });
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            // auto catches network / connection error
            setIsLoading(false);
            setError(err.message);
            // console.log(err.message);
            setNotify({
              isOpen: true,
              message: err.message,
              severity: "error",
              title: "Error",
            });
          }
        });
    }
  };
  const onClose = () => {
    setOpenPopup(false);
  };
  const columns = [
    { name: "author", label: "Author", options: { filter: false } },
    { name: "title", label: "Title", options: { filter: false } },
    { name: "url", label: "Link", options: { filter: false } },
    { name: "publishedAt", label: "Published", options: { filter: false } },
    { name: "description", label: "Description", options: { filter: false } },
  ];

  const options = {
    // filter: true,
    // filterType: "dropdown",
    search: false,
    pagination: false,
    responsive: "standard",
    selectableRowsHeader: false,
    selectableRows: "none",
    serverSide: true,
    sortOrder: {},
  };
  return (
    <>
      <PageHeader
        title="News"
        subTitle="News Import"
        icon={<SaveAltIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Button
            text="Import News"
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setTitle("Import News");
              setRecordForEdit(null);
            }}
          />
          <Controls.Button
            text="Save News"
            variant="contained"
            endIcon={<Send />}
            className={classes.newButton}
            onClick={() => {
              createNews(data);
            }}
          />
        </Toolbar>
      </Paper>
      <div>
        <MUIDataTable
          title={
            <Typography variant="h6">
              News Imported
              {isLoading && (
                <CircularProgress
                  size={24}
                  style={{ marginLeft: 15, position: "relative", top: 4 }}
                />
              )}
            </Typography>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <Popup
        title={title}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        onClose={onClose}
      >
        <NewsFilterForm recordForEdit={recordForEdit} fetchNews={fetchNews} />
      </Popup>
      <Loading isLoading={isLoading} />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
