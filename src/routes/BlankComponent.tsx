import React from "react";
import {
  renderRoutes,
  RouteConfigComponentProps
} from "react-router-config";

const BlankComponent: React.FC<RouteConfigComponentProps> = ({ route }) => {
  // @ts-ignore
  // console.log(route);
  return <>{renderRoutes(route.routes)}</>;
};
export default BlankComponent;

export const test = () => {
  return (
    <>fengbozuishuai</>
  )
}