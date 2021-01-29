import { ClassStmt } from "@angular/compiler";

export class Recipe{
   public name: String | undefined;
   public description: String | undefined;
   public imagePath: String | undefined;

   constructor(name:String, description: String, imagePath: String){
      this.name=name;
      this.description=description;
      this.imagePath=imagePath;

   }
}