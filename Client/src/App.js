import React from "react";
import { store } from "./js/store";
import { Provider } from "react-redux";

import "./App.css";
import Routes from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
