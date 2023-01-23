import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { getInitialState } from "./redux/store";
import App from "./App";

async function renderApp() {
  await getInitialState();

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
}

renderApp();
