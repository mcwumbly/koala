var canvas;

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });

  var circle = canvas.display.ellipse({
    x: 0,
    y: 0,
    radius: 80,
    fill: "#0aa"
  });

  for (i=0;i<20;i++) {
    circle = circle.clone({
      x: circle.x + 200,
      y: circle.y + 200,
    });
    setOriginalCircleDimensions(circle);
    canvas.addChild(circle);
  }
  
  resizeCanvas(canvas);
}

function setOriginalCircleDimensions(circle) {
  circle.x0 = circle.x;
  circle.y0 = circle.y;
  circle.radius0 = circle.radius;
}

function scaleCircle(circle, scaleFactor) {
  circle.x = circle.x0 * scaleFactor;
  circle.y = circle.y0 * scaleFactor;
  circle.radius = circle.radius0 * scaleFactor;
}

function resizeCanvas(canvas) {
  var normalizeLength = 1000;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var shortSide = width < height ? width : height;
  var scaleFactor = shortSide / normalizeLength;

  _.forEach(canvas.children, function(child) {
    scaleCircle(child, scaleFactor);
  });

  canvas.width = width;
  canvas.height = height;
}

window.onresize = function(event) {
  resizeCanvas(canvas);
}

oCanvas.domReady(runApp);

