import React from "react";
import reactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";

import App from "./App";
import store from "./app/store";
import "antd/dist/antd.css";

reactDOM.render(
  <Router>
    {/* Todo o App está dentro do Provider, ou seja, todo compónent dentro do App vai ter acesso a variável 'store' */}
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
