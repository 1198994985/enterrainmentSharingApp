import React, { useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
// import { mainRouteConfig } from '../../configs/routeConfig'
import LeftNav from "../../components/left-Nav/";
import { ChatView } from "../index";
import InitApp from "../../ajax/initApp";

import { getMyInfo } from "../../ajax";
import { storage } from "../../untils/storage";
import store from "../../redux";
import "./index.less";
function MainView(props) {
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      if (!storage.getToken()) {
        store.dispatch({
          type: "SET_USERID",
          data: undefined
        });
        props.history.push("/login");
        return;
      }
      const res = await getMyInfo();
      if (!(res instanceof Object)) {
        store.dispatch({
          type: "SET_USERID",
          data: undefined
        });
        return;
      }
      // 登陆过期，或者未登录
      if (res && String(res.status) === "401") {
        storage.removeToken();
        props.history.push("/login");
        return;
      }
      if (store && store.getState()?.useId) {
        setInit(true);
      } else {
        store.dispatch({
          type: "SET_USERID",
          data: res.userInfo[0].id
        });
        const init = new InitApp();
        await init.init();
        setInit(true);
      }
    })();
  }, [props.history]);
  console.log("props.route.routes", props.route.routes);
  if (isInit) {
    return (
      <div className="free-layout-wrapper">
        <LeftNav />
        {/* <Route path="/chat" exact component={ChatView} /> */}
        {renderRoutes(props.route.routes)}
      </div>
    );
  }
  return null;
}
export default withRouter(MainView);
