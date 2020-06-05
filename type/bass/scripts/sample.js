var SampleSection = (function() {

  // main init method
  function init(div) {
    // var url = 'models/test_content.json';
    var url = 'models/sample_content.json';

    fetchData(url, function(content){
      initializeSampleArea(div, controlInfo, content);
    });
  }

  /* =============== Model ================ */
  // Control info
  var controlInfo = {
    weights: [100, 200, 300, 400, 500, 600, 700],
    weightNames: [
      'Thin', 'ExtraLight', 'Light', 'Regular', 'Medium',
      'SemiBold', 'Bold'
      ],
    sizes: [
      8, 10, 12, 14, 16,
      18, 22, 26, 30, 36,
      42, 48, 56, 64, 80,
      96, 120, 144],
    alignments: ['left-align', 'center', 'right-align']
  };

  /* =============== initialize methods ================ */

  function initializeSampleArea(sampleDiv, controlInfo, sectionContent) {
    // Add darkmode button
    var darkButton = document.createElement('div');
    initializeDarkModeButton(darkButton);
    sampleDiv.appendChild(darkButton);

    // Add sample text areas
    for (var i = 0; i < sectionContent.length; i++) {
      var content = sectionContent[i];

      var lineDiv = document.createElement('div');
      SampleLine.init(lineDiv, controlInfo, content);
      sampleDiv.appendChild(lineDiv);
    }
  }

  function initializeDarkModeButton(darkButton) {
    darkButton.className = "w3-display-topright w3-xlarge";
    darkButton.setAttribute('id', 'dark-mode');

    var darkClass = "w3-black";
    var lightClass = "section-light-grey";

    darkButton.onclick = function() {
      var overviewDiv = this.parentElement.parentElement;
      if (overviewDiv.classList.contains(darkClass)) {
        overviewDiv.classList.remove(darkClass);
        overviewDiv.classList.add(lightClass);
      }
      else {
        overviewDiv.classList.remove(lightClass);
        overviewDiv.classList.add(darkClass);
      }
    }

    var icon = document.createElement('i');
    icon.className = "fa fa-adjust";
    icon.id = "dark-icon";
    darkButton.appendChild(icon);
  }

  /* =============== data fetch methods =============== */

  function fetchData(url, callback) {
    var unicodeRequest = fetch(url)
      .then(function(response) { 
         return response.json()
      });

    Promise.all([unicodeRequest])
      .then(function(values){
        callback(values[0]);
    });
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());