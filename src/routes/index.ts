import { RouteConfig } from "react-router-config";
import BlankComponent, { test } from "./BlankComponent";
import { Home, MusicDetail, MvPage } from "../pages";
import { MusicCard, PlayList } from "./../component/";



const routesConfig: RouteConfig[] = [
  {
    component: BlankComponent,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
        routes: []
      },
      {
        path: "/song/:id",
        component: MusicDetail,
        routes: []
      },
      
      {
        path: "/mv/:id",
        component: MvPage,
        routes: []
      }
    ]
  }
];
export default routesConfig;
