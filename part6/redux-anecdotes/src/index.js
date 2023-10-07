import React from "react";
import ReactDOM from "react-dom/client";
//import { createStore, combineReducers } from 'redux'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

// const reducer = combineReducers(
//   {
//     anecdotes: anecdoteReducer,
//     filter: filterReducer
//   }
// )

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  },
})
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
//console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
