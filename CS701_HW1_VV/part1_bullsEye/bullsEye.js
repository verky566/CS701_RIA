var bullsEyeModule = (function () {
  //onload property specifies an event handler
  //function that is invoked
  window.onload = init;

  // canvas and context variables
  var canvas;
  var context;

  // center of the pattern
  var centerX, centerY;
  var delay = false;

  // Interval
  var timerId;

  //create initial shape
  function init() {
    canvas = document.getElementById("testCanvas");
    context = canvas.getContext("2d");

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    // draw the initial pattern
    drawPattern();
  }

  // called whenever the slider value changes or the delay checkbox is clicked
  function drawPattern() {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }
    //clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    //get the current bandwidth value
    var bandWidth = document.getElementById("band").value;
    document.getElementById("widthDisplay").value = bandWidth;

    delay = document.getElementById("delay").checked;

    //fill in the rest - create variables
    var radius = 200;
    var evenStripe = 0;
    startAngle = 0;
    endAngle = 2 * Math.PI;
    counterClockwise = true;

    //Repeat loop as long as the current radius is greater than 0.
    while (radius > 0) {
      //alternate the color of the filling
      //if the stripe is even then color red
      if (evenStripe % 2 === 0) {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "blue";
      }
      context.beginPath();
      //arc(x, y, radius, startAngle, endAngle [antiClockwise])
      context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
      context.fill();
      context.closePath();
      evenStripe++;
      //change radius by slider value
      radius = radius - bandWidth;
    }
  }

  return {
    drawPattern: drawPattern,
  };
})();
