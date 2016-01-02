var canvas;

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });

  var button = createCircle(80, 80, "#a44");
  button.bind("click tap", function () {
    var position = newCirclePosition();
    var circle = createCircle(position.x, position.y, "#0aa");
    makeDraggable(circle);
  });
  
  resizeCanvas(canvas);
}

function newCirclePosition() {
  var position = {
    x: 80,
    y: 200
  };

  while (circleExistsAt(position.x, position.y)) {
    position.y += 80;
    if (position.y > NORMAL_LENGTH - 50) {
      position.x += 80;
      position.y = 200;
    }
  }
  return position;
}

function circleExistsAt(x, y) {
  var foundOne = false; 
  _.forEach(canvas.children, function(child) {
    if (child.x0 == x && child.y0 == y) {
      foundOne = true;
    }
  });
  return foundOne;
}

function createCircle(x, y, fill) {
  var circle = canvas.display.ellipse({
    x: x,
    y: y,
    radius: 50,
    fill: fill,
    shadow: "1 1 4 #555"
  });
  setOriginalCircleDimensions(circle);
  canvas.addChild(circle);
  return circle;
}

function makeDraggable(circle) {
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
  scaleCircle(circle); 
}

function scaleCircle(circle) {
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

