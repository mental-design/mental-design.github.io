var SampleControl = (function() {

  var controlInfo;

  // main init method
  function init(div, cInfo, settings) {
    controlInfo = cInfo;

    createControls(div, controlInfo, settings);
  }

  /* =============== create methods ================ */

  function createControls(controlWrapper, controlInfo, settings) {
    var weightControl = document.createElement('div');
    SampleSlider.init(weightControl,
                      settings.weight,
                      controlInfo.weights,
                      toWeightLabel,
                      "Font Weight",
                      changeWeight);
    weightControl.classList.add("weight-control");
    weightControl.classList.add("separator");
    
    var sizeControl = document.createElement('div');
    SampleSlider.init(sizeControl,
                      settings.size,
                      controlInfo.sizes,
                      "resources/font_size.svg",
                      "Font Size",
                      changeSize);
    sizeControl.classList.add("size-control");
    sizeControl.classList.add("separator");

    var letterSpacingControl = document.createElement('div');
    SampleSlider.init(letterSpacingControl,
                      settings.letterSpacing,
                      controlInfo.letterSpacings,
                      "resources/letter_spacing.svg",
                      "Letter Spacing",
                      changeLetterSpacing);
    letterSpacingControl.classList.add("spacing-control");
    letterSpacingControl.classList.add("separator");

    var lineHeightControl = document.createElement('div');
    SampleSlider.init(lineHeightControl,
                      settings.lineHeight,
                      controlInfo.lineHeights,
                      "resources/line_height.svg",
                      "Line Height",
                      changeLineHeight);
    lineHeightControl.classList.add("height-control");
    lineHeightControl.classList.add("separator");

    var style1Control = document.createElement('div');
    SampleSlider.init(style1Control,
                      0,
                      controlInfo.styleSets,
                      toStyleSetLabel,
                      "Stylistic Set 1",
                      changeStyleSet);
    style1Control.classList.add("style1-control");
    style1Control.classList.add("separator");

    var caseControl = document.createElement('div');
    SampleSlider.init(caseControl,
                      0,
                      controlInfo.cases,
                      toCaseLabel,
                      "Case",
                      changeCase);
    caseControl.classList.add("case-control");
    caseControl.classList.add("separator");

    var alignControl = createAlignControl(settings.alignment);

    var controlDiv = document.createElement('div');
    controlDiv.classList.add("control");
    controlDiv.classList.add("control-light");
    controlDiv.appendChild(weightControl);
    controlDiv.appendChild(sizeControl);
    controlDiv.appendChild(letterSpacingControl);
    controlDiv.appendChild(lineHeightControl);
    controlDiv.appendChild(style1Control);
    controlDiv.appendChild(caseControl);
    controlDiv.appendChild(alignControl);
    controlDiv.hidden = !settings.showControl;

    // The wrapper keeps the layout static even when the controls are hiding
    controlWrapper.className = "control-wrapper";
    controlWrapper.appendChild(controlDiv);
  }

  // == Alignment ==
  function createAlignControl(alignment) {
    var alignIndex = controlInfo.alignments.indexOf(alignment);

    var div = document.createElement('div');
    div.className = "control-item align-control control-last";

    var alignTags = ['left', 'center', 'right', 'justify'];
    for (var i = 0; i < alignTags.length; i++) {
      var alignButton = createAlignButton(alignTags[i], i);
      if(i == alignIndex) {
        alignButton.classList.add('ctl-blue');
      }
      div.appendChild(alignButton);
    }
    
    return div; 
  }

  function createAlignButton(tag, index) {
    var alignButton = document.createElement('i');
    alignButton.className = "fa fa-align-" + tag;
    alignButton.onclick = function() {
      // Update text align
      changeAlign(this, index, controlInfo.alignments);

      // Update align control
      var others = this.parentElement.children;
      for (var i = 0; i < others.length; i++) {
        others[i].classList.remove('ctl-blue');
      }
      this.classList.add('ctl-blue');
    }
    return alignButton;
  }

  /* =============== utility methods ================ */

  function toWeightLabel(weight) {
    var weightIndex = controlInfo.weights.indexOf(weight);
    var weightName = controlInfo.weightNames[weightIndex];
    return weightName + " " + weight;
  }

  function toStyleSetLabel(styleSet) {
    return "<span class='ss0" + styleSet + "';'>SsTt</span>"
  }

  function toCaseLabel(caseType) {
    styleString = ""
    if (["uppercase", "lowercase"].includes(caseType)) {
        styleString = "text-transform:" + caseType
    }
    else if (["small-caps", "unicase"].includes(caseType)) {
        styleString = "font-variant-caps:" + caseType
    }
    return "<span style='" + styleString + "'>Aa</span>"
  }

  function changeCaseStyle(element, caseType) {
    if (["uppercase", "lowercase"].includes(caseType)) {
        element.style.textTransform = caseType
        element.style.fontVariantCaps = ''
    }
    else if (["small-caps", "unicase"].includes(caseType)) {
        element.style.fontVariantCaps = caseType
        element.style.textTransform = ''
    }
    else {
        element.style.fontVariantCaps = ''
        element.style.textTransform = ''
    }
  }

  /* =============== handle event methods ================ */

  function changeWeight(slider, weights) {
    var weight = weights[slider.value];

    var line = slider.parentElement.parentElement.parentElement.parentElement;

    // Update the font weight
    var sample = line.getElementsByClassName("sample")[0];
    sample.style.fontWeight = weight;
  }

  function changeSize(slider, sizes) {
    var size = sizes[slider.value];

    var line = slider.parentElement.parentElement.parentElement.parentElement;

    // Update the font size
    var sample = line.getElementsByClassName("sample")[0];
    sample.style.fontSize = size + "pt";
  }

  function changeLetterSpacing(slider, values) {
    var value = values[slider.value];

    var line = slider.parentElement.parentElement.parentElement.parentElement;

    // Update the font letter spacing
    var sample = line.getElementsByClassName("sample")[0];
    sample.style.letterSpacing = value + "em";
  }

  function changeLineHeight(slider, values) {
    var value = values[slider.value];

    var line = slider.parentElement.parentElement.parentElement.parentElement;

    // Update the font line height
    var sample = line.getElementsByClassName("sample")[0];
    sample.style.lineHeight = value;
  }

  function changeStyleSet(slider, values) {
    var value = values[slider.value];
    var line = slider.parentElement.parentElement.parentElement.parentElement;
    var sample = line.getElementsByClassName("sample")[0];
    for (var i = values.length - 1; i >= 0; i--) {
      sample.classList.remove("ss0" + values[i])
    }
    sample.classList.add("ss0" + value)
  }

  function changeCase(slider, values) {
    var caseType = values[slider.value]

    var line = slider.parentElement.parentElement.parentElement.parentElement
    var sample = line.getElementsByClassName("sample")[0]

    changeCaseStyle(sample, caseType)
  }

  function changeAlign(aControl, index, alignments) {
    var align = alignments[index];
    // TODO: Find a cleaner way to access the line without using id
    var line = aControl.parentElement.parentElement.parentElement.parentElement;

    // Update the alignment
    var sample = line.getElementsByClassName("sample")[0];
    for (var i = alignments.length - 1; i >= 0; i--) {
      sample.classList.remove('w3-' + alignments[i])
    }
    sample.classList.add('w3-' + align);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());