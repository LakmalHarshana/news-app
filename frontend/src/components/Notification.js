import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const { notify, setNotify } = props;
  // const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setNotify({
      ...notify,
      isOpen: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={notify.severity} onClose={handleClose}>
          <AlertTitle>{notify.title}</AlertTitle>
          <strong>{notify.message}</strong>
        </Alert>
      </Snackbar>
    </div>
  );
}
