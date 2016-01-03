var canvas;

function runApp() {
  canvas = oCanvas.create({
    canvas: "#canvas",
    background: "#0cc"
  });

  createButton();
  resizeCanvas(canvas);
}

function createButton() {
  var button = createCircle(80, 80, "#a44");
  button.bind("click tap", function () {
    var position = newCirclePosition();
    var circle = createCircle(position.x, position.y, "#0aa");
    addChipBehavior(circle);
  });
  button.bind("mouseenter touchenter", function () {
    this.shadowBlur = this.shadowBlur * 4;
    canvas.redraw();
  });
  button.bind("mouseleave touchleave", function () {
    this.shadowBlur = this.shadowBlur / 4;
    canvas.redraw();
  });
  button.bind("mousedown touchdown", function () {
    this.shadowBlur = this.shadowBlur / 2;
    canvas.redraw();
  });
  button.bind("mouseup touchup", function () {
    this.shadowBlur = this.shadowBlur * 2;
    canvas.redraw();
  });
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

function addChipBehavior(circle) {
  circle.dragAndDrop({
    start: function () {
      this.zIndex = "front";
      this.shadowBlur = this.shadowBlur * 2;
    },
    move: function () {
      this.dragged = true;
    },
    end: function () {
      this.x0 = this.x / widthScaleFactor();
      this.y0 = this.y / heightScaleFactor();
      this.shadowBlur = this.shadowBlur / 2;
    }
  });
  circle.bind("mouseup touchend", function () {
    if (this.dragged) {
      this.dragged = false;
      return;
    }
    this.fill = this.fill == "#a4a" ? "#0aa" : "#a4a";
    $('#itemPropertiesModal').modal({backdrop: 'static'});
  });
  circle.bind("touchmove", function (e) {
    e.preventDefault();
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

// modal stuff

$('#itemPropertiesModal').on('show.bs.modal', function (event) {
  var modal = $(this);
  modal.find('#item-name').val('Name');
  modal.find('#item-description').val('Description');
});

$('#itemPropertiesModal').on('submit',function (event) {
  event.preventDefault(); 
  saveProperties();
});

$('#item-save').on('click', function() {
  saveProperties();
});

function saveProperties() {
  $('#itemPropertiesModal').modal('hide');
}
