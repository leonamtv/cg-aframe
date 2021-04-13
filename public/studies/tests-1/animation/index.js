registerInitializeComponent();

registerRandomMoveComponent();

function registerInitializeComponent() {
  AFRAME.registerComponent("initialize", {
    init: function () {
      createMovimentedSpheres();
    },
  });
}

function createMovimentedSpheres() {
  setInterval(() => createSphere(), 500);
}

function createSphere() {
  const xRange = 30;
  const yRange = 2;
  const zRange = 30;

  const xVelocityRange = 20;
  const zVelocityRange = 20;

  const minPositionRadius = 20;

  const randX = Math.random() * 2 * xRange - xRange;
  const randY = Math.random() * 2 * zRange - zRange;

  const x = getMinRadiusValue(randX, minPositionRadius);
  const y = Math.random() * 2 * yRange - yRange;
  const z = getMinRadiusValue(randY, minPositionRadius);

  const velocityX = Math.random() * 2 * xVelocityRange - xVelocityRange;
  const velocityY = Math.random() * 0.2;
  const velocityZ = Math.random() * 2 * zVelocityRange - zVelocityRange;

  createMovimentedSphere({ x, y, z }, { velocityX, velocityY, velocityZ });
}

function getMinRadiusValue(value, radius) {
  if (value < 0) {
    return Math.min(value, -radius);
  }

  return Math.max(value, radius);
}

function createMovimentedSphere(
  { x, y, z },
  { velocityX, velocityY, velocityZ }
) {
  console.log({ x, y, z });

  const sphereEl = document.createElement("a-sphere");
  sphereEl.setAttribute("position", { x, y, z });
  sphereEl.setAttribute("radius", Math.random() * 2 + 2);

  sphereEl.setAttribute("material", { color: "#b1caf2", shader: "flat" });
  sphereEl.setAttribute("random-move", {
    velocityX,
    velocityY,
    velocityZ,
  });

  const sceneEl = document.querySelector("a-scene");
  sceneEl.appendChild(sphereEl);
}
