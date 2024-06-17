import { configureStore } from "@reduxjs/toolkit";
import nodesReducers from "./nodesReducers";

export const store = configureStore({
  reducer: {
    nodes: nodesReducers,
  },
});

export default store;
