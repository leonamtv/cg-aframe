function testCirclesColision(x0, y0, r0, x1, y1, r1) {
  const dx = x1 - x0;
  const dy = y1 - y0;

  const d = Math.sqrt(dy * dy + dx * dx);

  if (d <= r0 + r1) {
    return true;
  }

  return false;
}

function degToRad(graus) {
  return (graus * Math.PI) / 180;
}

function getElementRadius(element) {
  return parseFloat(element.getAttribute("radius"));
}
