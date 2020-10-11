import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/root";
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducer);

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
