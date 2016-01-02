var canvas;

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });


  for (i=0; i<5; i++) {
    var x = 200 * (i + 1);
    var y = 200 * (i + 1);
    var circle = canvas.display.ellipse({
      x: x,
      y: y,
      radius: 80,
      fill: "#0aa"
    });
    setOriginalCircleDimensions(circle);
    canvas.addChild(circle);
    circle.dragAndDrop({
      end: function () {
        var scaleFactor = getScaleFactor();
        this.x0 = this.x / scaleFactor;
        this.y0 = this.y / scaleFactor;
      }
    });
  }
  
  resizeCanvas(canvas);
}

function getScaleFactor() {
  var normalizeLength = 1000;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var shortSide = width < height ? width : height;
  return shortSide / normalizeLength;
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
  var scaleFactor = getScaleFactor();
  _.forEach(canvas.children, function(child) {
    scaleCircle(child, scaleFactor);
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onresize = function(event) {
  resizeCanvas(canvas);
}

oCanvas.domReady(runApp);

