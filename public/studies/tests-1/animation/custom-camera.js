const maxRotationRangeX = 360;
const maxRotationRangeY = 360;

const velocityFactor = 0.1;

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
    camZ -= velocityFactor * cosRotationX * cosRotationY;
  },

  // s
  83: () => {
    camX -= velocityFactor * sinRotationX;
    camZ += velocityFactor * cosRotationX * cosRotationY;
  },
};

let teclasPressionadas = {};

let sinRotationX = 0;
let sinRotationY = 0;
let cosRotationX = 1;
let cosRotationY = 1;

let camX = 0;
let camY = 0;
let camZ = 0;

let camRotationX = 0;
let camRotationY = 0;
let camRotationZ = 0;

function registerCustomCameraComponent() {
  AFRAME.registerComponent("custom-camera", {
    init: function () {
      registerEvents();
    },

    tick: tickKeyboardMovement,
  });
}

function registerEvents() {
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

  this.el.setAttribute("position", { x: camX, y: camY, z: camZ });
  this.el.setAttribute("rotation", {
    x: 0,
    y: camRotationY,
    z: 0,
  });
}

function getCamControlValues() {
  return { camX, camY, camZ, camRotationX, camRotationY, camRotationZ };
}

function handleMouseMove(event) {
  const { innerWidth, innerHeight } = window;

  defineCamRotation(
    Math.min(event.clientX, innerWidth),
    Math.min(event.clientY, innerHeight),
    innerWidth,
    innerHeight
  );
}

function defineCamRotation(
  mousePositionX,
  mousePositionY,
  objectWidth,
  objectHeight
) {
  const mouseRotationX =
    (mousePositionX / objectWidth) * maxRotationRangeX - maxRotationRangeX / 2;

  const mouseRotationY =
    (mousePositionY / objectHeight) * maxRotationRangeY - maxRotationRangeY / 2;

  camRotationY = -mouseRotationX;

  const mouseRotationXRad = degToRad(mouseRotationX);
  const mouseRotationYRad = degToRad(mouseRotationY);

  sinRotationX = Math.sin(mouseRotationXRad);
  sinRotationY = Math.sin(mouseRotationYRad);

  cosRotationX = Math.cos(mouseRotationXRad);
  cosRotationY = Math.cos(mouseRotationYRad);
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
