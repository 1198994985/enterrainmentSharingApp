// @ts-nocheck
import React from "react";
import {
  Camera,
  Color,
  Ray3,
  IntersectResult,
  CheckerMaterial,
  PhongMaterial,
  Plane,
  Sphere,
  Union,
  Vector3
} from "../../rayTracing/index.js";
function rayTraceRecursive(scene, ray, maxReflect) {
  var result = scene.intersect(ray);

  if (result.geometry) {
    let shadow = new Ray3(result.position, new Vector3(1, 1, 1).normalize());
    let shadowRes = scene.intersect(shadow);
    let color =
      result.material.diffuse ||
      result.geometry.material.sample(undefined, result.position, undefined);
    let reflectiveness = result.geometry.material.reflectiveness;
    //console.log(result);
    

   if (reflectiveness > 0 && maxReflect > 0) {
     if (!shadowRes.geometry) {
      color =  color.multiply(0.5);
       color = color.add(result.geometry.material.sample(
         ray,
         result.position,
         result.normal
       ));
     }
    color = color.multiply(1 - reflectiveness);
     var r = result.normal
       .multiply(-2 * result.normal.dot(ray.direction))
       .add(ray.direction);
     ray = new Ray3(result.position, r);
     var reflectedColor = rayTraceRecursive(scene, ray, maxReflect - 1);
     color = color.add(reflectedColor.multiply(reflectiveness));
 }
    return color;
  } else return new Color(0.0, 0.0, 0.0);
}

function rayTraceReflection(canvas, scene, camera, maxReflect) {
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  if (!ctx.getImageData) return;

  var w = canvas.attributes.width.value;
  var h = canvas.attributes.height.value;
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, w, h);

  var imgdata = ctx.getImageData(0, 0, w, h);
  var pixels = imgdata.data;

  scene.initialize();
  camera.initialize();

  var i = 0;
  for (var y = 0; y < h; y++) {
    var sy = 1 - y / h;
    for (var x = 0; x < w; x++) {
      var sx = x / w;
      var ray = camera.generateRay(sx, sy);
      var color = rayTraceRecursive(scene, ray, maxReflect);
      pixels[i++] = color.r * 255;
      pixels[i++] = color.g * 255;
      pixels[i++] = color.b * 255;
      pixels[i++] = 255;
    }
  }

  ctx.putImageData(imgdata, 0, 0);
}

interface Props {}
export function run() {
  var plane = new Plane(new Vector3(0, 1, 0), 0);
  var sphere2 = new Sphere(new Vector3(2, 9, -10), 4);
  var sphere3 = new Sphere(new Vector3(16, 9, -10), 4);

  plane.material = new CheckerMaterial(0.1, 0.5);
  sphere2.material = new PhongMaterial(
    new Color(0.0, 1.0, 1.0),
    new Color(1.0, 1.0, 1.0),
    13,
    0.3
  );
  sphere3.material = new PhongMaterial(
    new Color(0.7, 0.9, 0.1),
    new Color(1.0, 1.0, 1.0),
    19,
    0.3
  );
  rayTraceReflection(
    document.getElementById("renderCanvas"),
    new Union([plane, sphere2, sphere3]),
    new Camera(
      new Vector3(10, 8, 15),
      new Vector3(0, 0, -1),
      new Vector3(0, 1, 0),
      90
    ),
    3
  );
}
const rayTracing: React.FC<Props> = () => {
  return (
    <>
      <canvas id="renderCanvas" width="600" height="600"></canvas>
      <button onClick={run}>add</button>
    </>
  );
};

export default rayTracing;
