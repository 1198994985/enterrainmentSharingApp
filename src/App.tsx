import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";

import routes from "./routes";
import "./reset.css";

const App: React.FC = () => {
  return (
    <>
      <Router>{renderRoutes(routes)}</Router>
    </>
  );
};

export default App;
