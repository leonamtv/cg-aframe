function registerBulletMoveComponent() {
    AFRAME.registerComponent("bullet", {
        schema: {
          velocityX: { type: "number", default: 10 },
          velocityY: { type: "number", default: 0 },
          velocityZ: { type: "number", default: 10 },
          limit : { type: "number", default: 500 }
        },
        init: function () {
          const scene = document.querySelector("a-scene");
          this.initialTime = scene.time;
          this.initialX = this.el.getAttribute("position").x;
          this.initialY = this.el.getAttribute("position").y;
          this.initialZ = this.el.getAttribute("position").z;
        },
    
        update: function () {},
    
        remove: function () {},
    
        tick: function (time) {
            const componentTime = time - this.initialTime;

            const x = this.initialX + (componentTime * this.data.velocityX) / 10;
            const y = this.initialY + (componentTime * this.data.velocityY) / 10;
            const z = this.initialZ + (componentTime * this.data.velocityZ) / 10;
        
            this.el.setAttribute("position", {
                x,
                y,
                z,
            });
        
            if (x > this.data.limit || z > this.data.limit || x < ( -this.data.limit ) || z < ( -this.data.limit )) {
              this.el.parentNode.removeChild(this.el);
            }
        },
      });
}