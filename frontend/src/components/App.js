import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { getUserAPI } from "../actions/users";

import Boards from "./Boards";
import NavBar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import User from "./User";
import NotFound from "./NotFound";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(
    function loadCurrUser() {
      let jwt = JSON.parse(window.localStorage.getItem("_token"));
      if (!user && jwt) {
        let username = JSON.parse(window.localStorage.getItem("username"));
        dispatch(getUserAPI(username));
      }
    },
    [dispatch, user]
  );
  return (
    <div className="App">
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/boards/:boardId">
          <Boards></Boards>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
