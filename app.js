var canvas;

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });


  for (i=0; i<10; i++) {
    var x = 80;
    var y = 80 * (i + 1);
    var circle = canvas.display.ellipse({
      x: x,
      y: y,
      radius: 50,
      fill: "#0aa",
      shadow: "1 1 4 #555"
    });
    setOriginalCircleDimensions(circle);
    canvas.addChild(circle);
    circle.dragAndDrop({
      start: function () {
        this.zIndex = "front";
        this.shadowBlur = this.shadowBlur * 2;
      },
      end: function () {
        this.x0 = this.x / widthScaleFactor();
        this.y0 = this.y / heightScaleFactor();
        this.shadowBlur = this.shadowBlur / 2;
      }
    });
  }
  
  resizeCanvas(canvas);
}

var NORMAL_LENGTH = 1000;

function widthScaleFactor() {
  return window.innerWidth / NORMAL_LENGTH;
}

function heightScaleFactor() {
  return window.innerHeight / NORMAL_LENGTH;
}
  
function sizeScaleFactor() {
  return Math.min(widthScaleFactor(), heightScaleFactor());
}

function setOriginalCircleDimensions(circle) {
  circle.x0 = circle.x;
  circle.y0 = circle.y;
  circle.radius0 = circle.radius;
}

function scaleCircle(circle, scaleFactor) {
  circle.x = circle.x0 * widthScaleFactor();
  circle.y = circle.y0 * heightScaleFactor();
  circle.radius = circle.radius0 * sizeScaleFactor();
}

function resizeCanvas(canvas) {
  _.forEach(canvas.children, function(child) {
    scaleCircle(child);
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.onresize = function(event) {
  resizeCanvas(canvas);
}

oCanvas.domReady(runApp);

