const keyActions = {
  // page up
  33: () => (camY -= velocityFactor),

  // page down
  34: () => (camY += velocityFactor),

  // a
  65: () => {
    camX -= velocityFactor * cosRotationX;
    camZ -= velocityFactor * sinRotationX;
  },

  // d
  68: () => {
    camX += velocityFactor * cosRotationX;
    camZ += velocityFactor * sinRotationX;
  },

  // w
  87: () => {
    camX += velocityFactor * sinRotationX;
    camZ -= velocityFactor * cosRotationX;
  },

  // s
  83: () => {
    camX -= velocityFactor * sinRotationX;
    camZ += velocityFactor * cosRotationX;
  },
};

const maxRotationRangeX = 360;
const maxRotationRangeY = 360;

const velocityFactor = 1;

let cameraEl;
let aircraftEl;

let teclasPressionadas = {};

let sinRotationX = 0;
let cosRotationX = 1;

let camX = 0;
let camY = 0;
let camZ = 0;

let camRotationX = 0;
let camRotationY = 0;
let camRotationZ = 0;

let enableMouseCameraControl = true;

function registerCustomCameraComponent() {
  AFRAME.registerComponent("custom-camera", {
    init: function () {
      registerEvents();
      cameraEl = document.querySelector("a-camera");
      aircraftEl = document.querySelector("#aircraft");
    },

    tick: tickKeyboardMovement,
  });
}

function registerEvents() {
  document.ontouchstart = handleTouchStart;
  document.onmousemove = handleMouseMove;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

function tickKeyboardMovement() {
  const actions = Object.entries(keyActions);

  actions.forEach(([keyCode, fn]) => {
    if (teclasPressionadas[keyCode]) {
      fn();
    }
  });

  if (enableMouseCameraControl) {
    moveCamera();
  }

  moveAircraft();
}

function getCamControlValues() {
  return { camX, camY, camZ, camRotationX, camRotationY, camRotationZ };
}

function handleTouchStart() {
  enableMouseCameraControl = false;
}

function handleMouseMove(event) {
  const { innerWidth } = window;
  defineCamRotation(Math.min(event.clientX, innerWidth), innerWidth);
}

function defineCamRotation(mousePositionX, objectWidth) {
  const mouseRotationX =
    (mousePositionX / objectWidth) * maxRotationRangeX - maxRotationRangeX / 2;
  camRotationY = -mouseRotationX;

  const mouseRotationXRad = degToRad(mouseRotationX);

  sinRotationX = Math.sin(mouseRotationXRad);
  cosRotationX = Math.cos(mouseRotationXRad);
}

function handleKeyDown(evento) {
  const keys = Object.keys(keyActions);

  if (keys.includes(`${evento.keyCode}`)) {
    evento.preventDefault();
  }

  teclasPressionadas[evento.keyCode] = true;
}

function handleKeyUp(evento) {
  teclasPressionadas[evento.keyCode] = false;
}

function degToRad(graus) {
  return (graus * Math.PI) / 180;
}

function moveCamera() {
  cameraEl.setAttribute("position", { x: camX, y: camY + 2, z: camZ });
  cameraEl.setAttribute("rotation", {
    x: 0,
    y: camRotationY,
    z: 0,
  });
}

function moveAircraft() {
  const { x, y, z } = cameraEl.getAttribute("position");

  const camRotationY = cameraEl.getAttribute("rotation").y;
  const camRotationYRad = degToRad(camRotationY);

  const aircraftRadius = 8;

  const aircraftX = x + aircraftRadius * Math.sin(-camRotationYRad);
  const aircraftY = y;
  const aircraftZ = z - aircraftRadius * Math.cos(-camRotationYRad);

  aircraftEl.setAttribute("position", {
    x: aircraftX,
    y: aircraftY,
    z: aircraftZ,
  });

  const animation_pos = aircraftEl.getAttribute("animation__pos");
  animation_pos.to = `${aircraftX} ${aircraftY + 0.5} ${aircraftZ}`;

  aircraftEl.setAttribute("animation__pos", animation_pos);
}
