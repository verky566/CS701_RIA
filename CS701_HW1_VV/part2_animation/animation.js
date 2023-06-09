var animModule = (function () {
  // entry point for logging to the console
  var Debugger = {};

  Debugger.log = function (message) {
    try {
      console.log(message);
    } catch (exception) {}
  };

  // start the canvas app once the window loads
  window.onload = init;
  Debugger.log("loading canvas");

  // exit early if the canvas is not supported by the browser
  if (!canvasSupported()) {
    Debugger.log("Canvas not supported.");
    return;
  }

  //create element
  function canvasSupported() {
    return !!document.createElement("canvas").getContext;
  }

  var canvas;
  var context;
  var width, height;

  var ballRadius = 10;
  var chgColor = "blue";
  var ballPosition;
  var angle = 0;

  // displacement of ball for each step
  var dx = 5;
  //created variables
  var dy = ballRadius * 3;
  startPosition = { x: ballRadius, y: ballRadius + 5 };

  function init() {
    canvas = document.getElementById("testCanvas");
    context = canvas.getContext("2d");

    // set canvas dimensions
    width = canvas.width;
    height = canvas.height;

    // current ball position
    ballPosition = { x: ballRadius, y: ballRadius + 5 };
  }

  function setSpeed(speed) {
    let newSpeed = +speed;
    if (dx > 0) dx = newSpeed;
    else dx = -newSpeed;
  }

  // draw current position on the canvas
  function drawBallOnCanvas() {
    //Uncaught TypeError: Cannot set properties of undefined (setting 'fillStyle')
    context.fillStyle = "#d3c0c0";
    context.lineWidth = 2;
    context.fillRect(0, 0, width, height);

    // Fill in the rest of the code
    leftSide = height - dy;
    rightSide = height + dy;

    context.beginPath(); // Start a new path
    context.moveTo(leftSide, 15 + ballRadius); //line begins
    context.lineTo(0, 15 + ballRadius); //line ends
    context.stroke(); //render the path
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 4);
    context.lineTo(dy, 15 + ballRadius * 4);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 7);
    context.lineTo(0, 15 + ballRadius * 7);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 10);
    context.lineTo(dy, 15 + ballRadius * 10);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 13);
    context.lineTo(0, 15 + ballRadius * 13);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 16);
    context.lineTo(dy, 15 + ballRadius * 16);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 19);
    context.lineTo(0, 15 + ballRadius * 19);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 22);
    context.lineTo(dy, 15 + ballRadius * 22);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 25);
    context.lineTo(0, 15 + ballRadius * 25);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 28);
    context.lineTo(dy, 15 + ballRadius * 28);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 31);
    context.lineTo(0, 15 + ballRadius * 31);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(rightSide, 15 + ballRadius * 34);
    context.lineTo(dy, 15 + ballRadius * 34);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(leftSide, 15 + ballRadius * 37);
    context.lineTo(0, 15 + ballRadius * 37);
    context.stroke();
    context.closePath();

    function updatePosition() {
      context.beginPath();
      context.fillStyle = chgColor;

      context.arc(ballPosition.x, ballPosition.y, ballRadius, angle, 2 * Math.PI, true);

      context.fill();
      context.closePath();
      ballPosition.x += dx;

      if (ballPosition.x > 390) {
        // 3 - apply gravity to velocity
        ballPosition.y += dy;
        //reverse or change direction due to colision
        dx = -dx;
        ballPosition.x += dx;
        chgColor = "red";
      }
      // 4 - check for collisions
      if (ballPosition.x <= 0 && ballPosition.y !== startPosition.y) {
        ballPosition.y += dy;
        dx = -dx;
        ballPosition.x += dx;
        chgColor = "blue";
      }

      if (ballPosition.y >= 400) {
        dx = -dx;
        ballPosition.x += dx;
        ballPosition.x = startPosition.x;
        ballPosition.y = startPosition.y;
        chgColor = "blue";
      }
    }
    updatePosition();
  }
  // browser specific animation request
  // when animating on canvas, it is best to use requestAnimationFrame
  // instead of setTimeout or setInterval
  // not supported in all browsers though and
  //sometimes needs a prefix, so we need a shim

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      // fall back to JavaScript setTimeout
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Define the Animation
  function doAnimation() {
    // Draw a single frame of animation on our canvas
    requestAnimFrame();

    // After this frame is drawn, let the browser schedule the next one
    window.requestAnimFrame(doAnimation);
  }

  // Start the Animation
  window.requestAnimFrame(doAnimation);
  return {
    setSpeed: setSpeed,
  };
})();
