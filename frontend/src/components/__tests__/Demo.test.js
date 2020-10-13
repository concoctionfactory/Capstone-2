import React from "react";
import { render } from "@testing-library/react";
import Demo from "../Demo";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Demo />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Demo />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows text ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Demo />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("WorkFlow")).toBeInTheDocument();
  expect(component.getByText("demo mode")).toBeInTheDocument();
});
