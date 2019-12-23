  //@ts-nocheck
import { IntersectResult, Intersect } from "./intersect";
import { IRay } from "./Ray";

export interface ISphere {
  center: number;
  radius: number;
}

export let Sphere = function(center, radius) {
  this.center = center;
  this.radius = radius;
};

const copy: () => ISphere = function()  {
  return new Sphere(this.center.copy(), this.radius.copy());
};
const initialize = function()  {
  this.sqrRadius = this.radius * this.radius;
};

const intersect: (ray: IRay) => Intersect = function(ray)  {
  let v = ray.origin.subtract(this.center);
  let a0 = v.sqrLength() - this.sqrRadius;
  let DdotV = ray.direction.dot(v);
  if (DdotV <= 0) {
    let discr = DdotV * DdotV - a0;
    if (discr >= 0) {
      let result = new IntersectResult();
      result.geometry = this;
      result.distance = -DdotV - Math.sqrt(discr);
      result.position = ray.getPoint(result.distance);
      result.normal = result.position.subtract(this.center).normalize();
      return result;
    }
  }

  return IntersectResult.prototype.noHit;
};
Sphere.prototype.copy = copy;
Sphere.prototype.initialize = initialize;
Sphere.prototype.intersect = intersect;


