  //@ts-nocheck
import { Ray3, IRay } from "./Ray";

export let Camera = function(eye, front, up, fov) {
  this.eye = eye;
  this.front = front;
  this.refUp = up;
  this.fov = fov;
};

const initialize = function() {
    this.right = this.front.cross(this.refUp);
    this.up = this.right.cross(this.front);
    this.fovScale = Math.tan((this.fov * 0.5 * Math.PI) / 180) * 2;
  }
const generateRay: (x: number, y: number) => IRay = function(x, y)  {
  var r = this.right.multiply((x - 0.5) * this.fovScale);
  var u = this.up.multiply((y - 0.5) * this.fovScale);
  return new Ray3(
    this.eye,
    this.front
      .add(r)
      .add(u)
      .normalize()
  );
};
Camera.prototype.initialize = initialize;
Camera.prototype.generateRay = generateRay;
