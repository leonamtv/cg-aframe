var extendDeep = AFRAME.utils.extendDeep;

// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
var meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive(
  "my-box",
  extendDeep({}, meshMixin, {
    // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
    defaultComponents: {
      geometry: { primitive: "box" },
    },

    // Defined mappings from HTML attributes to component properties (using dots as delimiters).
    // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
    mappings: {
      depth: "geometry.depth",
      height: "geometry.height",
      width: "geometry.width",
    },
  })
);

AFRAME.registerComponent("log", {
  schema: { type: "string" },

  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  },
});

AFRAME.registerComponent("random-move", {
  schema: {
    bar: { type: "number" },
    baz: { type: "string" },
  },

  init: function () {
    // Do something when component first attached.
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    console.log(time);
  },
});
