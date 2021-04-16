function registerRandomMoveComponent() {
  AFRAME.registerComponent("random-move", {
    schema: {
      velocityX: { type: "number", default: 10 },
      velocityY: { type: "number", default: 0 },
      velocityZ: { type: "number", default: 10 },
      limit: { type: "number", default: 300 },
      level: { type: "number", default: 1 },
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

      if (
        x > this.data.limit ||
        x < -this.data.limit ||
        z > this.data.limit ||
        z < -this.data.limit
      ) {
        this.el.parentNode.removeChild(this.el);
      }

      testColisionWithAircraft(this.el, this.aircraftEl);
    },
  });
}

let gameOver = false;
let lastColisionTime = 0;
const intervalBetweenColisions = 1000;

function testColisionWithAircraft(asteroidEl, aircraftEl) {
  if (gameOver) {
    return;
  }

  const currentTime = new Date().getTime();
  const haveColision = isColliding(asteroidEl, aircraftEl);

  if (!haveColision) {
    return;
  }

  let audio = new Audio('../../../assets/impact.mp3');
  audio.volume = 0.8
  audio.play( ) 

  if (currentTime < lastColisionTime + intervalBetweenColisions) {
    return;
  }


  lastColisionTime = new Date().getTime();

  setCollisionDamage(aircraftEl);
}

function isColliding(asteroidEl, aircraftEl) {
  const asteroidPos = asteroidEl.getAttribute("position");
  const asteroidRadius = getElementRadius(asteroidEl);

  const aircraftPos = aircraftEl.getAttribute("position");
  const aircraftRadius = getElementRadius(aircraftEl);

  return testCirclesColision(
    asteroidPos.x,
    asteroidPos.z,
    asteroidRadius,
    aircraftPos.x,
    aircraftPos.z,
    aircraftRadius
  );
}

function setCollisionDamage(aircraftEl) {
  const lifes = decreaseAndGetLifesCount();

  if (lifes > 0) {
    return;
  }

  setGameOver();
}

function decreaseAndGetLifesCount() {
  let el = document.getElementById("vida");
  const lifesText = el.innerText;
  const lifes = lifesText.match("([0-9]?).*")[1];

  const newCount = parseInt(lifes) - 1;
  el.innerHTML = newCount.toString() + " de vida";

  return newCount;
}

function setGameOver() {
  const cameraEl = document.querySelector("a-camera");

  const { x, y, z } = cameraEl.getAttribute("position");

  const camRotationY = cameraEl.getAttribute("rotation").y;
  const camRotationYRad = degToRad(camRotationY);

  const textRadius = 40;

  const xOffset = -Math.cos(-camRotationYRad) * 27;
  const zOffset = -Math.sin(-camRotationYRad) * 27;

  const textX = x + textRadius * Math.sin(-camRotationYRad) + xOffset;
  const textY = y - 8;
  const textZ = z - textRadius * Math.cos(-camRotationYRad) + zOffset;

  const textEl = document.createElement("a-text");

  textEl.setAttribute("value", "GAME OVER!!");
  textEl.setAttribute("color", "white");
  textEl.setAttribute("width", "180");

  textEl.setAttribute("position", {
    x: textX,
    y: textY,
    z: textZ,
  });

  textEl.setAttribute("rotation", {
    x: 0,
    y: camRotationY,
    z: 0,
  });

  const sceneEl = document.querySelector("a-scene");
  sceneEl.appendChild(textEl);
  gameOver = true;

  setTimeout(() => {
    location.reload();
  }, 1000);
}
