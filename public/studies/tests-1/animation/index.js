registerInitializeComponent();
registerRandomMoveComponent();

function registerInitializeComponent() {
  AFRAME.registerComponent("initialize", {
    init: function () {
      createMovimentedSpheres();
    },
  });
}

function registerRandomMoveComponent() {
  AFRAME.registerComponent("random-move", {
    schema: {
      movementsPerSecond: { type: "number", default: 40 },
    },
    init: function () {
      console.log("random move init", this.el.sceneEl);
      this.initialZ = this.el.getAttribute("position").z;
    },

    update: function () {
      console.log("random move update");
    },

    remove: function () {
      console.log("random move remove");
    },

    tick: function (time, timeDelta) {
      const currentPosition = this.el.getAttribute("position");
      const z = this.initialZ + (time * this.data.movementsPerSecond) / 1000;

      this.el.setAttribute("position", {
        x: currentPosition.x,
        y: currentPosition.y,
        z,
      });

      if (z > 10) {
        this.el.parentNode.removeChild(this.el);
      }
    },
  });
}

function createMovimentedSpheres() {
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 16 - 8;
    const y = Math.random() * 2;
    const z = -200 + Math.random() * 10d0;
    createMovimentedSphere({ x, y, z });
  }
}

function createMovimentedSphere({ x, y, z }) {
  const sphereEl = document.createElement("a-sphere");
  sphereEl.setAttribute("position", { x, y, z });
  sphereEl.setAttribute("radius", 0.25);

  sphereEl.setAttribute("material", { color: "#b1caf2", shader: "flat" });
  sphereEl.setAttribute("random-move", { movementsPerSecond: 10 });

  const sceneEl = document.querySelector("a-scene");
  sceneEl.appendChild(sphereEl);
}
