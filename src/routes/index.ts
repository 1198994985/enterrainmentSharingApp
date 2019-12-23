import { RouteConfig } from "react-router-config";
import BlankComponent from "./BlankComponent";
import { Home } from "../pages";

const routesConfig: RouteConfig[] = [
  {
    component: BlankComponent,
    routes: [
      {
        path: "/",
        component: Home,
        routes: [
          
        ]
      }
    ]
  }
];
export default routesConfig;
