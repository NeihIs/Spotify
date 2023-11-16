import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/stores";
import App from "./App";
import "./index.css";
import { GlobalHistory } from "./utils";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalHistory />
        <App />
        <div id="empty" tabIndex="-1" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
