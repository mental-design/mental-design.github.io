var CharacterSection = (function() {

  // main init method
  function init(div) {

    fetchData(function(data){
      initializeCharactersDiv(div, data, getSettings());
    });
  }

  // Control info
  var controlInfo = {
    weights: [100, 200, 300, 400, 500, 600, 700],
    weightNames: ['100', '200', '300', '400', '500', '600', '700'],
    sizes: sizes(20, 160, 40)
  };

  // Setup info
  var defaults = {
    weightIndex: 3,
    sizeIndex: 15
  };
  var smallScreenDefaults = {
    weightIndex: 6,
    sizeIndex: 5
  };

  /* =============== initialize methods ================ */

  function initializeCharactersDiv(div, data, settings) {
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
    initializeControls(controlDiv, controlInfo, settings);
    div.appendChild(controlDiv);
    
    // Add characters per type
    for (const catIdx in unicodeMap) {
      var charTypeDiv = document.createElement('div');
      var category = unicodeMap[catIdx];
      initializeCategoryDiv(charTypeDiv, category, glyphList);
      div.appendChild(charTypeDiv);
    }

    // Set defaults
    var weight = controlInfo.weights[settings.weightIndex];
    updateWeight(weight);
    var size = controlInfo.sizes[settings.sizeIndex];
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
    var feature = ("feature" in category) ? category["feature"] : undefined;

    div.classList.add("char-category");

    // Add title
    if (categoryName.length > 0) {
      var titleDiv = document.createElement('div');
      titleDiv.classList.add('char-title');
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
        initializeCharDiv(charDiv, charList[idx], feature);
        charListDiv.appendChild(charDiv);
      }
    }
    div.appendChild(charListDiv);
  }

  function initializeCharDiv(div, char, feature) {
    div.classList.add("char-cell");
    div.classList.add('sample-font');
    div.classList.add(feature);
    div.innerHTML = "&#x" + char;
  }

  // ===== Controls =====
  function initializeControls(controlDiv, controlInfo, settings) {
    controlDiv.id = "char-controls"
    controlDiv.classList.add("control");
    controlDiv.classList.add("w3-center");

    // Create weight slider
    var weight = controlInfo.weights[settings.weightIndex];
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
    var size = controlInfo.sizes[settings.sizeIndex];
    var sizeControl = document.createElement('div');
    SampleSlider.init(sizeControl,
                      size,
                      controlInfo.sizes,
                      "resources/font_size.svg",
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
    var unicodeURL = 'models/unicode.json';
    var unicodeRequest = fetch(unicodeURL)
      .then(function(response) { 
         return response.json()
      });

    // file containing the actual characters in the typeface
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
    return weightName; // + " " + weight;
  }

  function range(start, stop, count) {
    var rng = stop - start;
    var step = rng / (count-1);
    return [...Array(count).keys()].map(i => start + i * step);
  }

  function sizes(start, stop, count) {
    var lgArray = range(Math.log2(start), Math.log2(stop), count);
    var outArray = lgArray.map(i => 2 ** i);
    return outArray;
  }

  function getSettings() {
    return (screen.width < 600) ? smallScreenDefaults : defaults;
  }
  
  /* =============== export public methods =============== */

  return {
    init: init
  };
}());