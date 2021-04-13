(function () {
  registerInitializeComponent();
  registerCustomCameraComponent();
  registerRandomMoveComponent();
  registerBulletMoveComponent();
  registerBulletEvent();

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

  function registerBulletEvent() {
    this.onkeyup = function(e){
      if(e.keyCode == 32){
        createBullet()
      }
    }
  }
   

  function createMovimentedSpheres() {
    setInterval(() => createSphere(), 500);
  }

  function createBullet () {
    const bulletRadius = 1.4;
    const xVelocityRange = 20;
    const zVelocityRange = 20;

    const velocityX = Math.random() * 2 * xVelocityRange - xVelocityRange;
    const velocityY = 0;
    const velocityZ = Math.random() * 2 * zVelocityRange - zVelocityRange;

    createMovimentedBullet(
      { x : 0, y : 0, z : 0 },
      { velocityX, velocityY, velocityZ },
      bulletRadius
    )
  }

  function createSphere() {
    const camPosition = cameraEl.getAttribute("position");
    const camX = camPosition.x;
    const camZ = camPosition.z;

    const sphereRadius = Math.random() * 2 + 2;
    const bulletRadius = 1.4;
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
 
  function createMovimentedBullet(
    { x, y, z },
    { velocityX, velocityY, velocityZ },
    radius
  ) {
    const bulletEl = document.createElement("a-sphere");
    const aircraftPosition = aircraftEl.getAttribute("position");

    bulletEl.setAttribute("position", { x, y, z });
    bulletEl.setAttribute("radius", radius);
    bulletEl.setAttribute("material", { color: "blue", shader: "flat" });
    bulletEl.setAttribute("bullet", {
      velocityX,
      velocityY,
      velocityZ,
      directionX : aircraftPosition.x,
      directionZ : aircraftPosition.z,
    });

    const sceneEl = document.querySelector("a-scene");
    sceneEl.appendChild(bulletEl);
  }
})();
