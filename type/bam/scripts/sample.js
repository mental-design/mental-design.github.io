var SampleSection = (function() {

  // main init method
  function init(div, url) {
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
    sizes: sizes(8, 200, 50),
    letterSpacings: range(0, 0.5, 51),
    lineHeights: range(1.0, 2.0, 101),
    alignments: ['left-align', 'center', 'right-align', 'justify']
  };

  /* =============== initialize methods ================ */

  function initializeSampleArea(sampleDiv, controlInfo, sectionContent) {
    // Add style set toggle
    var styleButton = document.createElement('div');
    initializeStyleButton(styleButton);
    sampleDiv.appendChild(styleButton);

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

  function initializeStyleButton(styleButton) {
    // The toggle button
    styleButton.classList.add("w3-display-topleft");
    styleButton.setAttribute('id', 'toggle-style');

    var input = document.createElement('input');
    input.type = "checkbox";
    input.checked = true;
    selectStyleSet(input.checked);
    
    input.oninput = function() {
      selectStyleSet(input.checked);
    };
    var span = document.createElement('span');
    span.classList.add("switch-slider");

    var label = document.createElement('label');
    label.classList.add("switch");
    label.appendChild(input);
    label.appendChild(span);

    // single story a
    var singleSpan = document.createElement('span');
    singleSpan.classList.add("switch-label");
    singleSpan.classList.add("single-story");
    singleSpan.classList.add("mono");
    singleSpan.innerHTML = "a";

    // double story a    
    var doubleSpan = document.createElement('span');
    doubleSpan.classList.add("switch-label");
    doubleSpan.classList.add("double-story");
    doubleSpan.classList.add("mono");
    doubleSpan.innerHTML = "a";

    // Construct
    styleButton.appendChild(singleSpan);
    styleButton.appendChild(label);
    styleButton.appendChild(doubleSpan);
  }

  function initializeDarkModeButton(darkButton) {
    darkButton.classList.add("w3-display-topright")
    darkButton.classList.add("w3-xlarge");
    darkButton.setAttribute('id', 'dark-mode');

    var darkClass = "w3-black";
    var lightClass = "w3-white";

    var darkControl = "control-dark";
    var lightControl = "control-light";

    darkButton.onclick = function() {
      // Toggle section
      var overviewDiv = this.parentElement.parentElement;
      if (overviewDiv.classList.contains(darkClass)) {
        overviewDiv.classList.remove(darkClass);
        overviewDiv.classList.add(lightClass);
      }
      else {
        overviewDiv.classList.remove(lightClass);
        overviewDiv.classList.add(darkClass);
      }

      // Toggle controls
      var controls = overviewDiv.getElementsByClassName("control");
      for (var i = 0; i < controls.length; i++) {
        control = controls[i];
        if (control.classList.contains(darkControl)) {
          control.classList.remove(darkControl);
          control.classList.add(lightControl);
        }
        else {
          control.classList.remove(lightControl);
          control.classList.add(darkControl);
        }
      }
    }

    var icon = document.createElement('i');
    icon.className = "fa fa-adjust";
    icon.id = "dark-icon";
    darkButton.appendChild(icon);
  }

  function selectStyleSet(select) {
      var overviewDiv = document.body;
      if(select) {  // ss01
        overviewDiv.classList.remove("ss00");
        overviewDiv.classList.add("ss01");
      }
      else {  // ss00
        overviewDiv.classList.remove("ss01");
        overviewDiv.classList.add("ss00");
      }
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

  /* =============== utility methods =============== */
  // TODO: move this into a utility file
  function range(start, stop, count) {
    var rng = stop - start;
    var step = rng / (count-1);
    return [...Array(count).keys()].map(i => start + i * step);
  }
  // TODO: move this into a utility file
  function sizes(start, stop, count) {
    var lgArray = range(Math.log2(start), Math.log2(stop), count);
    var outArray = lgArray.map(i => 2 ** i);
    return outArray;
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());