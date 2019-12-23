  //@ts-nocheck
import { IVector, Vector3 } from "./vector";
import { IColor, Color } from "./Color";

export interface IPhone {
  diffuse: IColor;
  specular: IColor;
  shininess: number;
  reflectiveness: number;
}
interface IPhongMaterial{
  (diffuse: IColor, specular: IColor, shininess: number,  reflectiveness:number): void;
}


export let PhongMaterial: IPhongMaterial = function (
  diffuse,
  specular,
  shininess,
  reflectiveness
) {
  this.diffuse = diffuse;
  this.specular = specular;
  this.shininess = shininess;
  this.reflectiveness = reflectiveness;
};

// global temp
let lightDir: IVector = new Vector3(1, 1, 1).normalize();
let lightColor: IColor = Color.prototype.white;

PhongMaterial.prototype.sample=function(ray: Ray3, position, normal: IVector) {
    var NdotL = normal.dot(lightDir);
    var H = lightDir.subtract(ray.direction).normalize();
    var NdotH = normal.dot(H);
    var diffuseTerm = this.diffuse.multiply(Math.max(NdotL, 0));
    var specularTerm = this.specular.multiply(
      Math.pow(Math.max(NdotH, 0), this.shininess)
    );
    return lightColor.modulate(diffuseTerm.add(specularTerm));
  }

