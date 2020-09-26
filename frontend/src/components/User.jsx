import React from "react";
import UserForm from "./UserForm";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",

    padding: theme.spacing(3),
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const user = useSelector((state) => state.users);

  if (!user.username) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className={classes.content}>
      <UserForm></UserForm>
    </div>
  );
}
