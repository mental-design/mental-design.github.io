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
    if (!settings.showControl) {
      lineDiv.onmouseover = function() {
        var control = lineDiv.getElementsByClassName('control')[0];
        control.hidden = false;
      };
      lineDiv.onmouseout = function() {
        var control = lineDiv.getElementsByClassName('control')[0];
        control.hidden = true;
      }
    }

    var controlWrapper = document.createElement('div');
    SampleControl.init(controlWrapper, controlInfo, settings);
    lineDiv.appendChild(controlWrapper);

    var textDiv = document.createElement('div');
    initializeTextArea(textDiv, content.text, settings);
    lineDiv.appendChild(textDiv);
  }

  function initializeTextArea(textDiv, text, settings) {
    textDiv.style.fontWeight = settings.weight;
    textDiv.style.fontSize = settings.size + 'px';
    textDiv.className = "mono sample " + "w3-" + settings.alignment;
    textDiv.contentEditable = true;
    textDiv.innerHTML = text;
  }

  /* =============== utility methods ================ */

  function translateSettings(settings, controlInfo) {
    var translated = {};
    translated.weight = controlInfo.weights[settings.weightIndex];
    translated.size = controlInfo.sizes[settings.sizeIndex];
    translated.alignment = controlInfo.alignments[settings.alignIndex];
    translated.showControl = settings.showControl > 0;
    return translated;
  }  

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());