var rotationsModule = (function () {
  function changeSpeed() {
    var duration = document.getElementById("duration").value;
    document.getElementById("durationDisplay").value = duration + "s";

    // Fill in the rest of the code to change the duration
    // attributes of the four animations

    let imgAnimate = document.getElementsByTagName("animateTransform");
    for (let j = 0; j < imgAnimate.length; j++) {
      imgAnimate[i].setAttribute("timeDuration", duration);
    }
  }
  return {
    changeSpeed: changeSpeed,
  };
})();
