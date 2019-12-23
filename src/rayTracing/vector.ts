  //@ts-nocheck
export interface IVfunc {
  (x: number, y: number, z: number): void;
}
export interface IVector {
  x: number;
  y: number;
  z: number;
  copy: () => IVector;
  length: () => number;
  sqrLength: () => number;
  normalize: () => IVector;
  negate: () => IVector;
  add: (v: IVector) => IVector;
  subtract: (v: IVector) => IVector;
  multiply: (f: number) => IVector;
  divide: (f: number) => IVector;
  dot: (v: IVector) => number;
  cross: (v: IVector) => IVector;
}

export let Vector3: IVfunc = function(
         x: number,
         y: number,
         z: number
) { 
         this.x = x;
         this.y = y;
         this.z = z;
       };
Vector3.prototype.copy = function() {
  return new Vector3(this.x, this.y, this.z);
};
Vector3.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};
Vector3.prototype.sqrLength = function() {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};
Vector3.prototype.normalize = function() {
  let inv = 1 / this.length();
  return new Vector3(this.x * inv, this.y * inv, this.z * inv);
};
Vector3.prototype.negate = function() {
  return new Vector3(-this.x, -this.y, -this.z);
};
Vector3.prototype.add = function(v: IVector) {
  return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
};
Vector3.prototype.subtract = function(v: IVector) {
  return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
};
Vector3.prototype.multiply = function(f: number) {
  return new Vector3(this.x * f, this.y * f, this.z * f);
};
Vector3.prototype.divide = function(f: number) {
  let invf = 1 / f;
  return new Vector3(this.x * invf, this.y * invf, this.z * invf);
};
Vector3.prototype.dot = function(v: { x: number; y: number; z: number; }) {
  return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vector3.prototype.cross = function(v: { y: number; z: number; x: number; }) {
  return new Vector3(
    -this.z * v.y + this.y * v.z,
    this.z * v.x - this.x * v.z,
    -this.y * v.x + this.x * v.y
  );
};

Vector3.prototype.zero = new Vector3(0, 0, 0);
