function createCanvas() {
  return oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });
}

oCanvas.domReady(createCanvas);
