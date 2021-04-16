(function () {
  registerInitializeComponent();
  registerCustomCameraComponent();
  registerRandomMoveComponent();
  registerBulletMoveComponent();
  registerBulletEvents();

  let cameraEl;
  let aircraftEl;

  function registerInitializeComponent() {
    AFRAME.registerComponent("initialize", {
      init: function () {
        cameraEl = document.querySelector("a-camera");
        aircraftEl = document.querySelector("#aircraft");

        waitUserInteraction();
        createMovimentedSpheres();
      },
    });
  }

  function waitUserInteraction() {
    document.addEventListener("mousemove", interationHandle);
    document.addEventListener("keyup", interationHandle);
    document.addEventListener("touchstart", interationHandle);

    function interationHandle() {
      document.removeEventListener("mousemove", interationHandle);
      document.removeEventListener("keyup", interationHandle);
      document.removeEventListener("touchstart", interationHandle);

      let audio = new Audio("../../../assets/trilha.m4a");
      audio.loop = true;
      audio.volume = 0.3;
      audio.play();
    }
  }

  function registerBulletEvents() {
    this.onkeyup = (e) => {
      if (e.keyCode == 32) {
        createBullet();
      }
    };

    this.ontouchstart = (e) => {
      const touch = e.touches[0];
      const divisorY = window.innerHeight / 3;

      if (touch.pageY <= divisorY) {
        return;
      }

      if (touch.pageY > divisorY * 2) {
        return;
      }

      createBullet();
    };
  }

  function createMovimentedSpheres() {
    setInterval(() => createSphere(), 2000);
  }

  function createBullet() {
    if (aircraftEl.getAttribute("destroyed") === "true") {
      return;
    }

    let audio = new Audio("../../../assets/gun.mp3");
    audio.volume = 0.3;
    audio.play();

    const bulletRadius = 1.2;
    const xVelocityRange = 20;
    const zVelocityRange = 20;

    const camRotationY = cameraEl.getAttribute("rotation").y;
    const camRotationYRad = degToRad(camRotationY);

    const velocityX = -Math.sin(camRotationYRad);
    const velocityY = 0;
    const velocityZ = -Math.cos(-camRotationYRad);

    const { x, z } = aircraftEl.getAttribute("position");

    createMovimentedBullet(
      { x, y: 0, z },
      { velocityX, velocityY, velocityZ },
      bulletRadius
    );
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
    sphereEl.setAttribute("class", "asteroid");
    sphereEl.setAttribute("level", 1);
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

    bulletEl.setAttribute("position", { x, y, z });
    bulletEl.setAttribute("radius", radius);
    bulletEl.setAttribute("material", { color: "blue", shader: "flat" });
    bulletEl.setAttribute("bullet", {
      velocityX,
      velocityY,
      velocityZ,
    });

    const sceneEl = document.querySelector("a-scene");
    sceneEl.appendChild(bulletEl);
  }
})();
