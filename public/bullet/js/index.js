import bullet from "./bullet.js"

const scene = document.querySelector('a-scene')

for ( let i = 0; i < 10; i ++ ){
    scene.append(bullet())
}