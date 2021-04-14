function registerBulletMoveComponent() {
    AFRAME.registerComponent("bullet", {
        schema: {
          velocityX: { type: "number", default: 10 },
          velocityY: { type: "number", default: 0 },
          velocityZ: { type: "number", default: 10 },
          limit : { type: "number", default: 800 },
          radius : { type: "number", default: 1.2 }
        },
        init: function () {
          const scene = document.querySelector("a-scene");
          this.initialTime = scene.time;
          this.initialX = this.el.getAttribute("position").x;
          this.initialY = this.el.getAttribute("position").y;
          this.initialZ = this.el.getAttribute("position").z;
          this.spheres = document.querySelectorAll(".asteroid");
        },
    
        update: function () {},
    
        remove: function () {},
    
        tick: function (time) {
            const componentTime = time - this.initialTime;
            const x = this.initialX + (componentTime * this.data.velocityX) / 2;
            const y = this.initialY + (componentTime * this.data.velocityY) / 2;
            const z = this.initialZ + (componentTime * this.data.velocityZ) / 2 ;
        
            this.el.setAttribute("position", { x, y, z });

            this.spheres.forEach(e => {
                const pos = e.getAttribute('position')
                const rad = getElementRadius(e);
                if ( testCirclesColision ( pos.x, pos.z, rad, x, z, this.data.radius) ) {
                    let pontos = document.getElementById('pontos')
                    let pts = parseInt(pontos.innerText)
                    pts ++;
                    pontos.innerText = pts.toString(); 
                    e.setAttribute("level", 2)
                    this.el.parentNode.removeChild(this.el);
                    let audio = new Audio('../../../assets/explosion.mp3');
                    audio.volume = 1
                    audio.play( )      
                    e.parentNode.removeChild(e);
                }
            })

            if (x > this.data.limit || z > this.data.limit || x < ( -this.data.limit ) || z < ( -this.data.limit )) {
              this.el.parentNode.removeChild(this.el);
            }
        },
      });
}