import React, { useEffect } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { storage } from "../untils/storage";
import InitApp from "../ajax/initApp";
import store from "../redux";
import { getMyInfo } from "../ajax";
const BlankComponent: React.FC<RouteConfigComponentProps> = ({ route }) => {
  useEffect(() => {
    (async () => {
      if (!storage.getToken()) {
        //  props.history.push("/login");
         store.dispatch({
           type: "SET_USERID",
           data: undefined
         });
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
        // props.history.push("/login");
        return;
      } else {
        store.dispatch({
          type: "SET_USERID",
          data: res.userInfo[0].id
        });
        const init = new InitApp();
        await init.init();
      }
      //(true);
    })();
  }, []);
  // @ts-ignore
  // console.log(route);
  return <>{renderRoutes(route.routes)}</>;
};
export default BlankComponent;

export const test = () => {
  return <>fengbozuishuai</>;
};
