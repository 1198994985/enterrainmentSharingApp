  //@ts-nocheck

import { IntersectResult, Intersect } from "./intersect";
import { IRay } from "./Ray";

export interface IUnion {
  geometries: Vector3;
}

export let Union = function(geometries) {
  this.geometries = geometries;
};


const initialize = function () {
   for (let i in this.geometries) this.geometries[i].initialize();
  
}

const intersect: (ray: IRay) => Intersect = function(ray)  {
  let minDistance = Infinity;
  let minResult = IntersectResult.prototype.noHit;
  for (let i in this.geometries) {
    let result = this.geometries[i].intersect(ray);
    result.material = this.geometries[i].material;
    if (result.geometry && result.distance < minDistance && result.distance>0.6) {
      minDistance = result.distance;
      minResult = result;
    }
  }
  return minResult;
};
Union.prototype.initialize = initialize;
Union.prototype.intersect = intersect;