//@ts-nocheck
export interface IColor {
  r: number;
  g: number;
  b: number;
  copy: () => IColor;
  multiply: (s: number) => IColor;
  modulate: (c: IColor) => IColor;
  saturate: () => void;
  add: (c: IColor) => IColor;
}
export let Color = function(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
};

Color.prototype.copy = function() {
  return new Color(this.r, this.g, this.b);
};
Color.prototype.add = function(c) {
  return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
};
Color.prototype.multiply = function(s) {
  return new Color(this.r * s, this.g * s, this.b * s);
};
Color.prototype.modulate = function(c) {
  return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
};
Color.prototype.saturate = function() {
  this.r = Math.min(this.r, 1);
  this.g = Math.min(this.g, 1);
  this.b = Math.min(this.b, 1);
};

Color.prototype.black = new Color(0, 0, 0);
Color.prototype.white = new Color(1, 1, 1);
Color.prototype.red = new Color(1, 0, 0);
Color.prototype.green = new Color(0, 1, 0);
Color.prototype.blue = new Color(0, 0, 1);

// const copy: () => IColor = function() {
//   return new Color(this.r, this.g, this.b);
// };
// const add: (c: IColor) => IColor = function(c) {
//   return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
// };
// const multiply: (s: number) => IColor = function(s) {
//   return new Color(this.r * s, this.g * s, this.b * s);
// };

// const modulate: (c: IColor) => IColor = function(c) {
//   return new Color(this.r * c.r, this.g * c.g, this.b * c.b);
// };

// const saturate = function() {
//   this.r = Math.min(this.r, 1);
//   this.g = Math.min(this.g, 1);
//   this.b = Math.min(this.b, 1);
// };
// Color.prototype.copy = copy;
// Color.prototype.add = add;
// Color.prototype.multiply = multiply;
// Color.prototype.modulate = modulate;
// Color.prototype.saturate = saturate;
