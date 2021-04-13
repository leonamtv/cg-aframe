const bullet = ( y = 1, fps = 24 ) => {
    let element = document.createElement("a-sphere");
    let x = 0, z = 0, step = 0.1
 
    let frame_interval = Math.floor(1000 / fps);

    element.setAttribute("position", { x: x, y: y, z: z });
    element.setAttribute("material", "color", "blue");
    element.setAttribute("radius", 0.01);

    setInterval(() => {
        let position = element.getAttribute("position");
        let new_x = position.x, new_z = position.z
        new_z += step
        element.setAttribute("position", { x: new_x, y: y, z: new_z });
      }, frame_interval);

    return element;
}

export default bullet