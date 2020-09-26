import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOutUserAPI } from "../actions/users";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
  },
  sectionDesktop: {
    display: "flex",
  },
  link: {
    marginLeft: 8,
  },
}));

function NavBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleSignOut(e) {
    e.preventDefault();
    dispatch(signOutUserAPI());
    history.push("/");
  }

  function loginInfo() {
    if (user.username) {
      return (
        <React.Fragment>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Link component={RouterLink} to="/user" color="inherit">
            <Typography>{user.username}</Typography>{" "}
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to="/"
            color="inherit"
            onClick={handleSignOut}
          >
            <Typography>signout</Typography>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Link component={RouterLink} to="/login" color="inherit">
            <p>login/signup</p>
          </Link>
        </React.Fragment>
      );
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link
            className={classes.title}
            variant="h6"
            noWrap
            color="inherit"
            component={RouterLink}
            to="/"
          >
            WorkFlow
          </Link>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
          {loginInfo()}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
