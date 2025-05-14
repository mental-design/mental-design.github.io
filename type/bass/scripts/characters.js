var CharacterSection = (function() {

  var _charDiv = null
  var _onDarkChange = null

  // main init method
  function init(div, unicodeURL, callback=null, onDarkChange=null) {
    _charDiv = div.parentElement
    _onDarkChange = onDarkChange

    fetchData(function(data){
      initializeCharactersDiv(div, data, getSettings(), onDarkChange);
      if (callback)
        callback()
    }, unicodeURL);
  }

  // Control info
  var controlInfo = {
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    weightNames: [
      'Thin', 'ExtraLight', 'Light', 'Regular', 'Medium',
      'SemiBold', 'Bold', "ExtraBold", "Thick"
    ],
    sizes: sizes(20, 160, 40)
  };

  // Setup info
  var defaults = {
    weightIndex: 3,
    sizeIndex: 15
  };
  var smallScreenDefaults = {
    weightIndex: 3,
    sizeIndex: 5
  };

  /* =============== initialize methods ================ */

  function initializeDarkModeButton(darkButton, onDarkChange) {
    darkButton.className = "w3-display-topright w3-xlarge";
    darkButton.setAttribute('id', 'dark-mode');

    darkButton.onclick = function() {
      var charDiv = _charDiv
      var darkClass = "char-dark"
      var isDark = charDiv.classList.contains(darkClass)
      
      setDarkMode(isDark)
    }

    var icon = document.createElement('i')
    icon.className = "fa fa-adjust"
    icon.id = "dark-icon"
    darkButton.appendChild(icon)
  }

  function initializeCharactersDiv(div, data, settings, onDarkChange) {
    div.classList.add("ss00");

    // Add darkmode button
    var darkButton = document.createElement('div');
    initializeDarkModeButton(darkButton, onDarkChange);
    div.appendChild(darkButton);

    // Create Controller
    var controlDiv = document.createElement('div');
    initializeControls(controlDiv, controlInfo, settings);
    div.appendChild(controlDiv);

    let glyphList = Object.values(data["glyphMap"]).map(function(e){
      return parseInt(e).toString(16);
    });
    let unicodeMap = data["unicodeMap"];
    
    // Add category div
    for (const catIdx in unicodeMap) {
      var categoryDiv = document.createElement('div');
      var catData = unicodeMap[catIdx];
      initializeCategoryDiv(categoryDiv, catData, glyphList);
      div.appendChild(categoryDiv);
    }

    // Set defaults
    var weight = controlInfo.weights[settings.weightIndex];
    updateWeight(weight);
    var size = controlInfo.sizes[settings.sizeIndex];
    updateFontSize(size);
  }

  function checkFolding(subsData) {
    var isFolding = false
    for (const subIdx in subsData) {
      var subData = subsData[subIdx];
      if (Object.keys(subData).includes("foldable")) {
        isFolding = true
      }
    }
    return isFolding
  }

  function initializeCategoryDiv(div, catData, glyphList) {
    let categoryName = catData["title"];
    div.classList.add("char-category");

    let subsData = catData["subs"]

    // Add title
    if (categoryName.length > 0) {
      var titleDiv = document.createElement('div');
      titleDiv.classList.add('char-title');
      titleDiv.innerHTML = categoryName;
      div.appendChild(titleDiv);
    }

    // Check for folding
    if (checkFolding(subsData)) { // Add more button
      var moreBtn = document.createElement('div')
      moreBtn.classList.add("char-expand-btn")
      moreBtn.innerHTML = "More +"
      moreBtn.onclick = function () {
        let expanded = expandCharDiv(div)
        if (expanded) 
          moreBtn.innerHTML = "Less -"
        else
          moreBtn.innerHTML = "More +"
      }
      titleDiv.appendChild(moreBtn)
    }

    // Add sub divs
    for (const subIdx in subsData) {
      var subDiv = document.createElement('div');
      var subData = subsData[subIdx];
      initializeSubCategoryDiv(subDiv, subData, glyphList);
      div.appendChild(subDiv);
    }
  }

  function initializeSubCategoryDiv(div, subData, glyphList) {
    let subName = subData["title"];

    div.classList.add("char-sub-category");

    // Add characters
    range = subData["range"]
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

    let keys = Object.keys(subData)
    if (keys.includes("foldable")) {
      div.hidden = true
      div.classList.add("foldable")
    }
  }

  function initializeCharDiv(div, char) {
    div.classList.add("char-cell");

    var charDiv = document.createElement('div');
    charDiv.classList.add("char-div");
    charDiv.classList.add('sample-font');
    charDiv.innerHTML = "&#x" + char;
    div.appendChild(charDiv);

    var codeDiv = document.createElement('div');
    codeDiv.classList.add('mono-font');
    codeDiv.classList.add("char-code");
    codeDiv.innerHTML = "0x" + zeroFill(char, 4).toUpperCase();
    div.appendChild(codeDiv);
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
                      "Font Weight",
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
                      "Font Size",
                      changeSize);
    sizeControl.classList.add("size-control");
    controlDiv.appendChild(sizeControl);
  }

  /* =============== control callback methods ================ */

  function updateCell(cell, size) {
    if (cell.style == undefined)   // cell.style is undefined for some cells. TODO: fix this.
        return

    let divWPx = (1.4 * size) + 'px';
    let divHPx = (1.5 * size) + 'px';

    let lhPx = (1.6 * size) + 'px';
    let sizePx = (size) + 'px';
    let chPx = (1.5 * size - 8) + 'px';

    cell.style.width = divWPx;
    cell.style.height = divHPx;
    var charDiv = cell.querySelector(".char-div");
    charDiv.style.fontSize = sizePx;
    charDiv.style.lineHeight = lhPx;

    var charCode = cell.querySelector(".char-code");
    if (size < 50) {  // Hide unicode
      charDiv.style.marginTop = 0;
      charDiv.style.marginBottom = 0;
      charCode.hidden = true;
    }
    else {
      charDiv.style.marginTop = "-6px";
      charDiv.style.height = chPx;
      charCode.hidden = false; 
    }
  }

  function updateFontSize(size) {
    let charCells = document.getElementsByClassName("char-cell");
    for (const idx in charCells) {
      var cell = charCells[idx];
      updateCell(cell, size);
    }
  }

  function updateWeight(weight) {
    let charCells = document.getElementsByClassName("char-div");
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

  function fetchData(callback, unicodeURL) {
    // file containing the unicode characters to show
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
  function expandCharDiv(charDiv) {
    var expanded = false
    let childList = charDiv.children
    for (var i = childList.length - 1; i >= 0; i--) {
      let child = childList[i]
      if(child.classList.contains("foldable")) {
        child.hidden = !child.hidden
        expanded = !child.hidden
      }
    }
    return expanded
  }

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

  function zeroFill(char, n) {
    let fillCount = n - char.length

    if (fillCount > 0)
      return "0".repeat(fillCount) + char
    else
      return char
  }

  /* =============== public methods =============== */

  function setDarkMode(isDark) {
    var cellBgColor = "#fefefe"
    var darkClass = "char-dark"
    var lightClass = "section-light-grey"
    var charDiv = _charDiv
    var onDarkChange = _onDarkChange

    if (isDark) {  // light
      charDiv.classList.remove(darkClass)
      charDiv.classList.add(lightClass)
    }
    else {  // dark
      charDiv.classList.remove(lightClass)
      charDiv.classList.add(darkClass)
      cellBgColor = "#161616"
    }

    let charCells = document.getElementsByClassName("char-cell")
    for (const idx in charCells) {
      var cell = charCells[idx]
      if (cell.style) {
        cell.style.background = cellBgColor
      }
    }

    if (onDarkChange) {
      onDarkChange(!isDark)
    }
  }
  
  /* =============== export public methods =============== */

  return {
    init: init,
    setDarkMode: setDarkMode
  };
}());