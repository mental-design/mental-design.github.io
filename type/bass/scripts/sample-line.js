var SampleLine = (function() {

  // main init method
  function init(lineDiv, controlInfo, content) {
    // Initialize parts
    initializeSampleLine(lineDiv, controlInfo, content);
  }

  /* =============== initialize methods ================ */

  function initializeSampleLine(lineDiv, controlInfo, content) {
    var settings = translateSettings(content.settings, controlInfo);
    
    lineDiv.classList.add("sample-line");
    lineDiv.onpaste = function(e) {
      e.preventDefault();  // cancel paste
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');  // get text
      document.execCommand("insertHTML", false, text);  // insert text manually
    }
    if (settings.editable & !settings.showControl) {
      lineDiv.onmouseover = function() {
        var control = lineDiv.getElementsByClassName('control')[0];
        control.hidden = false;
      };
      lineDiv.onmouseout = function() {
        var control = lineDiv.getElementsByClassName('control')[0];
        control.hidden = true;
      }
    }

    if (settings.editable | settings.showControl) {
      var controlWrapper = document.createElement('div');
      SampleControl.init(controlWrapper, controlInfo, settings);
      lineDiv.appendChild(controlWrapper);
    }

    var textDiv = document.createElement('div');
    sampleText = content.text
    if ("text" in content.settings) {  // TODO: clean this up. The mobile text override is messy
      sampleText = settings.text
    }
    initializeTextArea(textDiv, sampleText, settings);
    lineDiv.appendChild(textDiv);
  }

  function initializeTextArea(textDiv, text, settings) {
    textDiv.style.fontWeight = settings.weight;
    textDiv.style.fontSize = settings.size + 'pt';
    textDiv.style.letterSpacing = settings.letterSpacing + 'em';
    textDiv.style.lineHeight = settings.lineHeight;
    setCase(textDiv, settings.caseType)
    textDiv.classList.add("sample-font");
    textDiv.classList.add("sample");
    textDiv.classList.add("w3-" + settings.alignment);
    textDiv.contentEditable = settings.editable;
    textDiv.innerHTML = text;
  }

  /* =============== utility methods ================ */

  function translateSettings(settings, controlInfo) {
    if (screen.width < 600) {  // Settings for mobile devices
      if ("smallScreen" in settings) {
        var smallSettings = settings.smallScreen;

        var paramList = Object.keys(smallSettings);
        for (var i = 0; i < paramList.length; i++) {
          var setting = paramList[i];
          if (setting in smallSettings) {
            settings[setting] = smallSettings[setting];
          }
        }
      }
    }

    if (!("editable" in settings)) {
      settings.editable = 1
    }

    if (!("caseIndex" in settings)) {
      settings.caseIndex = 2
    }

    var translated = {};
    translated.weight = controlInfo.weights[settings.weightIndex];
    translated.size = controlInfo.sizes[settings.sizeIndex];
    translated.letterSpacing = controlInfo.letterSpacings[settings.letterSpacingIndex];
    translated.lineHeight = controlInfo.lineHeights[settings.lineHeightIndex];
    translated.alignment = controlInfo.alignments[settings.alignIndex];
    translated.caseType = controlInfo.cases[settings.caseIndex];
    translated.showControl = settings.showControl > 0;
    translated.editable = settings.editable > 0;
    if ("text" in settings) {  // TODO: clean this up. The mobile text override is messy
      translated.text = settings.text
    }
    return translated;
  }

  function setCase(div, caseType) {
    if (["uppercase", "lowercase"].includes(caseType)) {
        div.style.textTransform = caseType
        div.style.fontVariantCaps = ''
    }
    else if (["small-caps", "unicase"].includes(caseType)) {
        div.style.fontVariantCaps = caseType
        div.style.textTransform = ''
    }
    else {
        div.style.fontVariantCaps = ''
        div.style.textTransform = ''
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());