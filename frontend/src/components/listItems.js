import React from "react";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LockIcon from "@material-ui/icons/Lock";

export function MainListItems() {
  const history = useHistory();
  const changeRoute = (path) => {
    history.push(path);
  };
  const logout = (path) => {
    localStorage.removeItem("authToken");
    history.push(path);
  };
  return (
    <div>
      <ListItem
        button
        onClick={() => {
          changeRoute("/");
        }}
      >
        <ListItemIcon style={{ color: "#ccc" }}>
          <SaveAltIcon />
        </ListItemIcon>
        <ListItemText primary="News Import" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          changeRoute("/blog");
        }}
      >
        <ListItemIcon style={{ color: "#ccc" }}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="News Blog" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          logout("/login");
        }}
      >
        <ListItemIcon style={{ color: "#ccc" }}>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
}

export const secondaryListItems = <div></div>;
