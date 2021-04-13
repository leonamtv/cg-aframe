(function () {
  registerInitializeComponent();
  registerCustomCameraComponent();
  registerRandomMoveComponent();

  let cameraEl;
  let aircraftEl;

  function registerInitializeComponent() {
    AFRAME.registerComponent("initialize", {
      init: function () {
        cameraEl = document.querySelector("a-camera");
        aircraftEl = document.querySelector("#aircraft");
        createMovimentedSpheres();
      },
    });
  }

  function createMovimentedSpheres() {
    setInterval(() => createSphere(), 500);
  }

  function createSphere() {
    const camPosition = cameraEl.getAttribute("position");
    const camX = camPosition.x;
    const camZ = camPosition.z;

    const sphereRadius = Math.random() * 2 + 2;
    const aircraftRadius = aircraftEl.getAttribute("radius");

    const xRange = 30;
    const zRange = 30;

    const xVelocityRange = 20;
    const zVelocityRange = 20;

    const minPositionRadius = 20;

    const randX = camX + Math.random() * 2 * xRange - xRange;
    const randZ = camZ + Math.random() * 2 * zRange - zRange;

    const x = getMinRadiusValue(randX, minPositionRadius, camX);
    const y = sphereRadius * 0.5;
    const z = getMinRadiusValue(randZ, minPositionRadius, camZ);

    const velocityX = Math.random() * 2 * xVelocityRange - xVelocityRange;
    const velocityY = 0;
    const velocityZ = Math.random() * 2 * zVelocityRange - zVelocityRange;

    createMovimentedSphere(
      { x, y, z },
      { velocityX, velocityY, velocityZ },
      sphereRadius
    );
  }

  /// 0: center of creation. Replace by aircraft position
  function getMinRadiusValue(value, radius, center) {
    if (value < center) {
      return Math.min(value, center - radius);
    }

    return Math.max(value, center + radius);
  }

  function createMovimentedSphere(
    { x, y, z },
    { velocityX, velocityY, velocityZ },
    radius
  ) {
    const sphereEl = document.createElement("a-sphere");
    sphereEl.setAttribute("position", { x, y, z });
    sphereEl.setAttribute("radius", radius);

    sphereEl.setAttribute("material", { color: "#b1caf2", shader: "flat" });
    sphereEl.setAttribute("random-move", {
      velocityX,
      velocityY,
      velocityZ,
    });

    const sceneEl = document.querySelector("a-scene");
    sceneEl.appendChild(sphereEl);
  }
})();
