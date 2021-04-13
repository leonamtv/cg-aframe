const bullet = ( y = 1, fps = 24 ) => {
    let element = document.createElement("a-sphere");
    let x = 0, z = 0, step = 1
    let limit = 200
    let frame_interval = Math.floor(1000 / fps);

    element.setAttribute("position", { x: x, y: y, z: z });
    element.setAttribute("material", "color", "blue");
    element.setAttribute("radius", .05   );

    let interval_id = setInterval(() => {
      let position = element.getAttribute("position");
      let new_x = position.x, new_z = position.z
      new_z -= step
      element.setAttribute("position", { x: new_x, y: y, z: new_z });
      if ( position.x > limit || position.y > limit || position.z > limit ||
           position.y < ( -limit ) || position.y < ( -limit ) || position.z < (-limit ))  {
        const scene = document.querySelector("a-scene");
        scene.removeChild(element)
        clearInterval(interval_id)
      }
  
    }, frame_interval);



    return element;
}

export default bullet