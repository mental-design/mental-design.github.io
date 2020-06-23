var CharacterSection = (function() {

  // main init method
  function init(div) {

    fetchData(function(data){
      initializeCharactersDiv(div, data);
    });
  }

  // Control info
  var controlInfo = {
    weights: [100, 200, 300, 400, 500, 600, 700],
    weightNames: [
      'Thin', 'ExtraLight', 'Light', 'Regular', 'Medium',
      'SemiBold', 'Bold'
      ],
    sizes: [
      20, 24, 30, 36, 42,
      48, 56, 64, 80, 96,
      128, 160]
  };

  // Setup info
  var defaults = {
    weightIndex: 3,
    sizeIndex: 3
  };

  /* =============== initialize methods ================ */

  function initializeCharactersDiv(div, data) {
    let glyphList = Object.values(data["glyphMap"]).map(function(e){
      return parseInt(e).toString(16);
    });
    let unicodeMap = data["unicodeMap"];

    // Add darkmode button
    var darkButton = document.createElement('div');
    initializeDarkModeButton(darkButton);
    div.appendChild(darkButton);

    // Create Controller
    var controlDiv = document.createElement('div');
    initializeControls(controlDiv, controlInfo, defaults);
    div.appendChild(controlDiv);
    
    // Add characters per type
    for (const catIdx in unicodeMap) {
      var charTypeDiv = document.createElement('div');
      var category = unicodeMap[catIdx];
      initializeCategoryDiv(charTypeDiv, category, glyphList);
      div.appendChild(charTypeDiv);
    }

    // Set defaults
    var weight = controlInfo.weights[defaults.weightIndex];
    updateWeight(weight);
    var size = controlInfo.sizes[defaults.sizeIndex];
    updateFontSize(size);
  }

  function initializeDarkModeButton(darkButton) {
    darkButton.className = "w3-display-topright w3-xlarge";
    darkButton.setAttribute('id', 'dark-mode');

    darkButton.onclick = function() {
      var charDiv = this.parentElement.parentElement;
      var cellBgColor = "#fefefe";
      var darkClass = "w3-black"
      if (charDiv.classList.contains(darkClass)) {
        charDiv.classList.remove(darkClass);
      }
      else {
        charDiv.classList.add(darkClass);
        cellBgColor = "#0c0c0c";
      }

      let charCells = document.getElementsByClassName("char-cell");
      for (const idx in charCells) {
        var cell = charCells[idx];
        if (cell.style) {
          cell.style.background = cellBgColor;
        }
      }
    }

    var icon = document.createElement('i');
    icon.className = "fa fa-adjust";
    icon.id = "dark-icon";
    darkButton.appendChild(icon);
  }

  function initializeCategoryDiv(div, category, glyphList) {
    let categoryName = category["category"];
    let range = category["range"];

    div.classList.add("char-category");

    // Add title
    if (categoryName.length > 0) {
      var titleDiv = document.createElement('div');
      titleDiv.classList.add('char-title');
      titleDiv.classList.add('sample-font');
      titleDiv.innerHTML = categoryName;
      div.appendChild(titleDiv);
    }

    // Add characters
    var charListDiv = document.createElement('div');
    var charList = translateCodeRange(range);
    for (const idx in charList) {
      let char = charList[idx];
      if (glyphList.includes(char)) {
        var charDiv = document.createElement('div');
        initializeCharDiv(charDiv, charList[idx]);
        charListDiv.appendChild(charDiv);
      }
    }
    div.appendChild(charListDiv);
  }

  function initializeCharDiv(div, char) {
    div.classList.add("char-cell");
    div.classList.add('sample-font');
    div.innerHTML = "&#x" + char;
  }

  // ===== Controls =====
  function initializeControls(controlDiv, controlInfo, defaults) {
    controlDiv.id = "char-controls"
    controlDiv.classList.add("control");
    controlDiv.classList.add("w3-center");

    // Create weight slider
    var weight = controlInfo.weights[defaults.weightIndex];
    var weightControl = document.createElement('div');
    SampleSlider.init(weightControl,
                      weight,
                      controlInfo.weights,
                      toWeightLabel,
                      changeWeight);
    weightControl.classList.add("weight-control");
    weightControl.classList.add("separator");
    controlDiv.appendChild(weightControl);

    // Create size slider
    var size = controlInfo.sizes[defaults.sizeIndex];
    var sizeControl = document.createElement('div');
    SampleSlider.init(sizeControl,
                      size,
                      controlInfo.sizes,
                      toSizeLabel,
                      changeSize);
    sizeControl.classList.add("size-control");
    controlDiv.appendChild(sizeControl);
  }

  /* =============== control callback methods ================ */

  function updateFontSize(size) {
    let divWPx = (1.4 * size) + 'px';
    let divHPx = (1.5 * size) + 'px';
    let lhPx = (1.6 * size) + 'px';
    let sizePx = (size) + 'px';

    let charCells = document.getElementsByClassName("char-cell");
    for (const idx in charCells) {
      var cell = charCells[idx];
      if (cell.style) {  // cell.style is undefined for some cells. TODO: fix this.
        cell.style.fontSize = sizePx;
        cell.style.width = divWPx;
        cell.style.height = divHPx;
        cell.style.lineHeight = lhPx;
      }
    }
  }

  function updateWeight(weight) {
    let charCells = document.getElementsByClassName("char-cell");
    for (const idx in charCells) {
      var cell = charCells[idx];
      if (cell.style) {  // cell.style is undefined for some cells. TODO: fix this.
        cell.style.fontWeight = weight;
      }
    }
  }

  function changeWeight(slider, weights) {
    var weight = weights[slider.value];
    updateWeight(weight);
  }

  function changeSize(slider, sizes) {
    var size = sizes[slider.value];
    updateFontSize(size);
  }

  /* =============== data fetch methods =============== */

  function fetchData(callback) {
    // file containing the unicode characters to show
    // var unicodeURL = 'models/test_unicode.json';
    var unicodeURL = 'models/unicode.json';
    var unicodeRequest = fetch(unicodeURL)
      .then(function(response) { 
         return response.json()
      });

    // file containing the actual characters in the typeface
    // TODO: read off woff file if possible.
    var codemapURL = 'models/code_map.json';
    var codemapRequest = fetch(codemapURL)
      .then(function(response) { 
         return response.json()
      });

    var data = {"unicodeMap":{}, "glyphMap": {}};
    Promise.all([unicodeRequest, codemapRequest])
      .then(function(values){
        data["unicodeMap"] = values[0];
        data["glyphMap"] = values[1];
        callback(data);
    });
  }

  /* =============== utility methods =============== */

  function translateCodeRange(codeRange) {
    var charList = [];
    for (const idx in codeRange) {
      let codeList = codeRange[idx];
      if (codeList.includes('-')) {  // parse list
        var cc = codeList.split('-');
        let codeStart = parseInt(cc[0]);
        let codeEnd = parseInt(cc[1]);
        for (var i = codeStart; i <= codeEnd; i++) {
          charList.push(i.toString(16));
        }
      }
      else { // add single
        charList.push(parseInt(codeList).toString(16));
      }
    }
    return charList;
  }

  function toWeightLabel(weight) {
    var weightIndex = controlInfo.weights.indexOf(weight);
    var weightName = controlInfo.weightNames[weightIndex];
    return weightName + " " + weight;
  }

  function toSizeLabel(size) {
    return ""; //size + "px";
  }
  
  /* =============== export public methods =============== */

  return {
    init: init
  };
}());