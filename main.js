(function () {
  var active = false;
  var frames = 0;
  var start;
  var numTests = 6;
  var minFpsLimit = 25;
  var failedTestLimit = 3;
  var intTest = 1500;

  var frame = function () {
    frames = frames + 1;
    if (active) {
      window.requestAnimationFrame(frame);
    }
  };

  window.FPS = {
    start: function () {
      active = true;
      frames = 0;
      start = window.performance.now();
      frame();
    },

    end: function () {
      active = false;
      var seconds = (window.performance.now() - start) / 1000;
      var fps = Math.round(frames / seconds);
      return fps;
    },
    
    runFpsCheck: function(callback) {
      setInterval(function(){
        numTests--;
        if (numTests >= 0){
          window.FPS.start();
          setTimeout(function(){
            var fps = window.FPS.end();
            if (fps < minFpsLimit){
              failedTestLimit--;
              if (failedTestLimit < 0) {
                callback();
              }
            }
            console.log(window.FPS.end());
          }, 1000);      
        }
      }, intTest);
    }  
  };
}());
