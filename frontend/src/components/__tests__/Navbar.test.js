import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { userData } from "./testData";
const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("not signed in ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("WorkFlow")).toBeInTheDocument();
  expect(component.getByText("login/signup")).toBeInTheDocument();
});

it("sign in ", function () {
  const initialState = { users: userData };
  const store = mockStore(initialState);

  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("WorkFlow")).toBeInTheDocument();
  expect(component.getByText("signout")).toBeInTheDocument();
});
