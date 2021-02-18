import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

import { fetchImages } from "./features/getImages/getImages";

test("Show loading images", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText("Loading images...")).toBeInTheDocument();
});

test("We show a list of posts", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("Loading images...")).toBeInTheDocument();
  expect(fetchImages).toHaveBeenCalledTimes(1);
  expect(fetchImages).toHaveBeenCalledWith();
});
