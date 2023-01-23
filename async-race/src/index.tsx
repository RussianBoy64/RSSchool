import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getCars } from "./redux/reducers/garage/garageActions";
import { getWinners } from "./redux/reducers/winners/winnersActions";
import App from "./App";

store.dispatch(getCars());
store.dispatch(getWinners());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
