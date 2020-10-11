import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers/root";
import { BrowserRouter } from "react-router-dom";
const store = createStore(rootReducer);

// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
// const middlewares = [thunk]; // add your middlewares like `redux-thunk`
// const mockStore = configureStore(middlewares);

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("not signed in ", function () {
  const component = render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
  expect(component.getByText("WorkFlow")).toBeInTheDocument();
  expect(component.getByText("demo mode")).toBeInTheDocument();
});

// it("demo mode ", function () {
//   const component = render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     </Provider>
//   );
//   fireEvent.click(component.getByText("demo mode"));
//   //expect(component.getByText("Summary")).toBeInTheDocument();
// });
