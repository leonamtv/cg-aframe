import asteroid from "./asteroid.js";
import bullet from "../../bullet/js/bullet.js"

const scene = document.querySelector("a-scene");

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
      scene.append(bullet())      
    }
}

for (let i = 0; i < 20; i++) {
  scene.append(asteroid());
}
