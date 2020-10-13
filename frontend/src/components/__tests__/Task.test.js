import React from "react";
import { render } from "@testing-library/react";
import Task from "../Task";
import { userData, boardData } from "./testData";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));
const boardId = boardData.id;
const list = boardData.lists[0];

const card = list.cards[0];

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Task card={card} boardId={boardId} />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Task card={card} boardId={boardId} />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows text ", function () {
  const component = render(
    <Provider store={store}>
      <BrowserRouter>
        <Task card={card} boardId={boardId} />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("not_started")).toBeInTheDocument();
});
