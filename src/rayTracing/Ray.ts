  //@ts-nocheck
import { IVector } from "./vector";

export interface IRay {
  getPoint(distance: IVector): IVector;
  origin: IVector;
  direction: IVector;
}

export let Ray3 = function(origin, direction) {
  this.origin = origin;
  this.direction = direction;
};

Ray3.prototype.getPoint = function(t) {
    return this.origin.add(this.direction.multiply(t));
}

