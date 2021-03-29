import asteroid from 'asteroid.js'

const scene = document.querySelector('a-scene')

for ( let i = 0; i < 200; i++ ) {
    scene.append(asteroid())
}