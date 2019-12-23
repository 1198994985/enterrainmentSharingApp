  //@ts-nocheck

import { IVector, Vector3 } from "./vector";


export interface Intersect {
  geometry:object;
  distance: number;
  position: IVector;
  normal: IVector;
 
}


export let IntersectResult = function () {
  this.geometry = null;
  this.distance = 0;
  this.position = Vector3.prototype.zero;
  this.normal = Vector3.prototype.zero;
};
IntersectResult.prototype.noHit = new IntersectResult();
//IntersectResult.noHit = new IntersectResult();
