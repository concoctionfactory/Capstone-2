import React from "react";
import { render } from "@testing-library/react";
import BoardForm from "../BoardForm";
import { userData, boardData } from "./testData";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
const username = userData.username;

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardForm isOpen={false} board={boardData} username={username} />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardForm isOpen={false} board={boardData} username={username} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("is open ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <BoardForm isOpen={true} board={boardData} username={username} />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("Edit Board")).toBeInTheDocument();
  expect(component.getByText("Cancel")).toBeInTheDocument();
  expect(component.getByText("update")).toBeInTheDocument();
});
