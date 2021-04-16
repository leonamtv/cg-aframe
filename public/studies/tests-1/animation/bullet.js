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
                  let level = e.getAttribute('level')
                  let pontos = document.getElementById('pontos')
                  let pts = parseInt(pontos.innerText)
                  pts += ( level * 2 );

                  pontos.innerText = pts.toString(); 
                  if ( this.el.parentNode )
                    this.el.parentNode.removeChild(this.el);
                  let audio = new Audio('../../../assets/explosion.mp3');
                  audio.volume = 1
                  audio.play( )      
                  
                  if ( level <= 2 ) {
                    const position_e = e.getAttribute('position')
                    const radius_e = e.getAttribute('radius')
                    const random_move_e = e.getAttribute("random-move")
                    
                    const asteroid_a = document.createElement("a-sphere");
                    asteroid_a.setAttribute('position', position_e)
                    asteroid_a.setAttribute('radius', radius_e / 2)
                    asteroid_a.setAttribute('class', 'asteroid')
                    asteroid_a.setAttribute("material", { color: "#b1caf2", shader: "flat" });
                    asteroid_a.setAttribute('level', parseInt(level) + 1)
                    asteroid_a.setAttribute("random-move", {
                      velocityX : 1.2 * random_move_e.velocityX,
                      velocityY : 1.2 * random_move_e.velocityY,
                      velocityZ : 2.4 * random_move_e.velocityZ,
                    });

                    const asteroid_b = document.createElement("a-sphere");
                    asteroid_b.setAttribute('position', position_e)
                    asteroid_b.setAttribute('radius', radius_e / 2)
                    asteroid_b.setAttribute('class', 'asteroid')
                    asteroid_b.setAttribute("material", { color: "#b1caf2", shader: "flat" });
                    asteroid_b.setAttribute('level', parseInt(level) + 1)
                    asteroid_b.setAttribute("random-move", {
                      velocityX : 1.2 * random_move_e.velocityX,
                      velocityY : 1.2 * random_move_e.velocityY,
                      velocityZ : -2.4 * random_move_e.velocityZ,
                    });

                    const sceneEl = document.querySelector("a-scene");
                    sceneEl.appendChild(asteroid_a );
                    sceneEl.appendChild(asteroid_b);
                    if (e.parentNode)
                      e.parentNode.removeChild(e);
                  } else if (level > 2) {
                    if (e.parentNode)
                      e.parentNode.removeChild(e);
                  }

                }
            })

            if (x > this.data.limit || z > this.data.limit || x < ( -this.data.limit ) || z < ( -this.data.limit )) {
              this.el.parentNode.removeChild(this.el);
            }
        },
      });
}