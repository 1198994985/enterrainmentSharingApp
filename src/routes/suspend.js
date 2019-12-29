
import React, { lazy, Suspense } from "react";
const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};
export default SuspenseComponent;
