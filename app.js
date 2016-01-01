var canvas;

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onresize = function(event) {
  resizeCanvas(canvas);
}

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });

  resizeCanvas(canvas);

  var circle = canvas.display.ellipse({
    x: 0,
    y: 0,
    radius: 80,
    fill: "#0aa"
  });

  for (i=0;i<20;i++) {
    circle = circle.clone({
      x: circle.x + 200,
      y: circle.y + 200
    });
    canvas.addChild(circle);
  }
}

oCanvas.domReady(runApp);

