import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserForm from "../UserForm";
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
        <UserForm />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows text ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <UserForm />
      </BrowserRouter>
    </Provider>
  );
  // expect(component.getByText("Sign Up")).toBeInTheDocument();
  expect(component.getByLabelText("first_name")).toBeInTheDocument();
  expect(component.getByLabelText("last_name")).toBeInTheDocument();
});
