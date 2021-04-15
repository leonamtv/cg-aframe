function registerRandomMoveComponent( ) {
  AFRAME.registerComponent("random-move", {
    schema: {
      velocityX: { type: "number", default: 10 },
      velocityY: { type: "number", default: 0 },
      velocityZ: { type: "number", default: 10 },
      limit : { type: "number", default: 300 },
      level : { type: "number", default: 1 }
    },

    init: function () {
      const scene = document.querySelector("a-scene");
      this.initialTime = scene.time;

      this.initialX = this.el.getAttribute("position").x;
      this.initialY = this.el.getAttribute("position").y;
      this.initialZ = this.el.getAttribute("position").z;
      this.aircraftEl = document.querySelector("#aircraft");
    },

    update: function () {},

    remove: function () {},

    tick: function (time) {
      const componentTime = time - this.initialTime;

      const x = this.initialX + (componentTime * this.data.velocityX) / 1000;
      const y = this.initialY + (componentTime * this.data.velocityY) / 1000;
      const z = this.initialZ + (componentTime * this.data.velocityZ) / 1000;

      this.el.setAttribute("position", {
        x,
        y,
        z,
      });

      if (x > this.data.limit || x < ( -this.data.limit ) || z > this.data.limit || z < ( -this.data.limit )) {
        this.el.parentNode.removeChild(this.el);
      }

      testColisionWithAircraft(this.el, this.aircraftEl);
    },
  });
}

let gameOver = false;
let lastAsteroid = null

function testColisionWithAircraft(asteroidEl, aircraftEl) {
  const asteroidPos = asteroidEl.getAttribute("position");
  const asteroidRadius = getElementRadius(asteroidEl);

  const aircraftPos = aircraftEl.getAttribute("position");
  const aircraftRadius = getElementRadius(aircraftEl);

  const haveColision = testCirclesColision(
    asteroidPos.x,
    asteroidPos.z,
    asteroidRadius,
    aircraftPos.x,
    aircraftPos.z,
    aircraftRadius
  );

  if (!lastAsteroid )
    lastAsteroid = asteroidEl
    
    if (haveColision === true && gameOver === false) {
      if ( lastAsteroid ) {
        if ( lastAsteroid != asteroidEl ) {
          let vida = document.getElementById('vida')
          let vid = parseInt(vida.innerText)
          vid--
          vida.innerHTML= vid.toString() + ' <p> de vida</p>'; 
          if ( vid == 0 ) {
            // alert("colision. Game over!");
            const textEl = document.createElement("a-text");
            textEl.setAttribute('value', 'GAME OVER!!')
            textEl.setAttribute('color', 'white')
            textEl.setAttribute('width', '80')
            aircraftEl = document.querySelector("#aircraft");
            textEl.setAttribute('position', {  x : aircraftEl.getAttribute('position').x, y : aircraftEl.getAttribute('position').y , z : aircraftEl.getAttribute('position').z })
            const sceneEl = document.querySelector("a-scene");
            sceneEl.appendChild(textEl);
            gameOver = true;
            setTimeout(() => {
              location.reload();
            }, 200)
          }   
        lastAsteroid = asteroidEl
      }
    }
  }
}
