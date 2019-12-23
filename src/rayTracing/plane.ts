  //@ts-nocheck
import { IntersectResult, Intersect } from "./intersect";
import { IVector } from "./vector";
import { IRay } from "./Ray";
import {Color} from "./Color"
export interface IPlane {
  normal: IVector;
  d: IVector;
}

export let Plane = function(normal, d) {
  this.normal = normal;
  this.d = d;
};

const copy: () => IPlane = function() {
  return new Plane(this.normal.copy(), this.d);
};
const initialize = function()  {
   this.position = this.normal.multiply(this.d);
};

const intersect: (ray: IRay) => Intersect = function(ray)  {
  let a = ray.direction.dot(this.normal);
  if (a >= 0) return IntersectResult.prototype.noHit;

  let b = this.normal.dot(ray.origin.subtract(this.position));
  let result = new IntersectResult();
  result.geometry = this;
  result.distance = -b / a;
  result.position = ray.getPoint(result.distance);
  result.normal = this.normal;
  return result;
};
Plane.prototype.copy = copy;
Plane.prototype.initialize = initialize;
Plane.prototype.intersect = intersect;


export let CheckerMaterial = function(scale, reflectiveness) {
  this.scale = scale;
  this.reflectiveness = reflectiveness;
};

CheckerMaterial.prototype.sample= function(ray, position, normal) {
    return Math.abs(
      (Math.floor(position.x * 0.1) + Math.floor(position.z * this.scale)) % 2
    ) < 1
      ? Color.prototype.black
      : Color.prototype.white;
  }
