import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers/root";
import { BrowserRouter } from "react-router-dom";
import BoardFrom from "./BoardForm";
const store = createStore(rootReducer);

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardFrom isOpen={false} />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardFrom isOpen={false} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("is open ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardFrom isOpen={true} />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("WorkFlow")).toBeInTheDocument();
});
