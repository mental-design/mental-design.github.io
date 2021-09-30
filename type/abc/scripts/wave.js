var Wave = (function() {

  // main init method
  function init(div, url) {
    fetchData(url, function(content){
      for (var i = 0; i < content.length; i++) {
        var waveData = content[i]
        var mode = waveData["mode"]

        var sampleDiv = document.createElement("div")
        // var line = new WaveLine()
        var line = getWaveLine(mode)
        line.initDiv(sampleDiv, waveData)

        div.appendChild(sampleDiv)
      }
    });
  }
  
  function getWaveLine(mode) {
    switch(mode) {
      case "fixed":
        return new FixedWaveLine()
      case "slider":
        return new SliderWaveLine()
      case "propagate":
        return new PropWaveLine()
      default:
        return new WaveLine()
    }
  }

  /* =============== data fetch methods =============== */
  function fetchData(url, callback) {
    var notesRequest = fetch(url)
      .then(function(response) {
         return response.json()
      });

    Promise.all([notesRequest])
      .then(function(values){
        callback(values[0]);
    });
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());