import { RouteConfig } from "react-router-config";
import BlankComponent, { test } from "./BlankComponent";
import { Home, MusicDetail, MvPage, Temp, GamePage } from "../pages";
import { MusicCard, PlayList ,} from "./../component/";
import SuspenseComponent from "./suspend";
import { MainView, Login } from "../containers/index.js";
import React, { lazy, Suspense } from "react";
import { ChatView } from "../containers/";
import { Redirect } from "react-router-dom";
// const ChatView = lazy(() => import("../containers/RightView"));
export default [
  {
    component: BlankComponent,
    routes: [
      {
        path: "/",
        component: SuspenseComponent(Home),
        exact: true
      },
      {
        path: "/song/:id",
        component: SuspenseComponent(MusicDetail)
      },

      {
        path: "/mv/:id",
        component: SuspenseComponent(MvPage)
      },
      {
        path: "/login",
        exact: true,
        component: SuspenseComponent(Login)
      },
      {
        path: "/register",
        component: SuspenseComponent(Temp),
        routes: []
      },

      {
        path: "/game/:id",
        exact: true,
        component: SuspenseComponent(GamePage),
      },
      {
        path: "/main",
        component: SuspenseComponent(MainView),
        routes: [
          {
            path: "/main/chat",
            component: SuspenseComponent(ChatView)
          }
        ]
      }
    ]
  }
];
