import React from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/index";
import routes from "./routes";
import "./reset.css";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>{renderRoutes(routes)}</Router>
    </Provider>
  );
};

export default App;
