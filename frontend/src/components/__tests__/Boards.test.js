import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Boards from "../Boards";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../reducers/root";
import { BrowserRouter, Route, MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { userData, boardData } from "./testData";
const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Boards />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Boards />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

///not working
it("shows text ", function () {
  const initialState = { users: userData, boards: boardData };
  const store = mockStore(initialState);

  const renderWithRouter = ({ children }) =>
    render(
      <MemoryRouter initialEntries={["/boards/91"]}>
        <Route path="/boards/:boardId">
          <Boards />
        </Route>
      </MemoryRouter>
    );
  // const component = render(
  //   <Provider store={store}>
  //     <BrowserRouter initialEntries={["boards/91"]}>
  //       <Route path="boards/:id">
  //         <Boards />
  //       </Route>
  //     </BrowserRouter>
  //   </Provider>
  // );
});
