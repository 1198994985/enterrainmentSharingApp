import React from "react";
import {
  renderRoutes,
  RouteConfigComponentProps
} from "react-router-config";

const BlankComponent: React.FC<RouteConfigComponentProps> = ({ route }) => {
  // @ts-ignore
  return <>{renderRoutes(route.routes)}</>;
};
export default BlankComponent;

export const test = () => {
  return (
    <>fengbozuishuai</>
  )
}