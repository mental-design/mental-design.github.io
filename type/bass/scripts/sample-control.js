var SampleControl = (function() {

  var controlInfo;
  var styleSetOn;

  // main init method
  function init(div, cInfo, settings) {
    controlInfo = cInfo
    styleSetOn = [0, 0, 0]

    createControls(div, controlInfo, settings)
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

    var alignControl = createAlignControl(settings.alignment);
    alignControl.classList.add("separator");

    // Style set 1
    var style1Control = document.createElement('div');
    SampleSlider.init(style1Control,
                      0,
                      controlInfo.styleSet1,
                      toStyleSet1Label,
                      "Stylistic Set 1",
                      changeStyleSet1);
    style1Control.classList.add("style1-control");
    style1Control.classList.add("separator");

    var style2Control = document.createElement('div');
    SampleSlider.init(style2Control,
                      0,
                      controlInfo.styleSet2,
                      toStyleSet2Label,
                      "Stylistic Set 2",
                      changeStyleSet2);
    style2Control.classList.add("style2-control");
    style2Control.classList.add("separator");

    var style3Control = document.createElement('div');
    SampleSlider.init(style3Control,
                      0,
                      controlInfo.styleSet3,
                      toStyleSet3Label,
                      "Stylistic Set 3",
                      changeStyleSet3);
    style3Control.classList.add("style3-control");
    style3Control.classList.add("separator");

    // Case
    var caseControl = document.createElement('div');
    SampleSlider.init(caseControl,
                      settings.caseType,
                      controlInfo.cases,
                      toCaseLabel,
                      "Case",
                      changeCase);
    caseControl.classList.add("case-control");
    caseControl.classList.add("control-last");

    var itControl = document.createElement('div');
    var itButton = createItalicsButton();
    itControl.classList.add("italic-control")
    itControl.classList.add("control-item")
    itControl.classList.add("align-control")
    itControl.appendChild(itButton);
    itControl.classList.add("separator");

    var controlDiv = document.createElement('div');
    controlDiv.classList.add("control");
    controlDiv.classList.add("control-light");
    controlDiv.appendChild(weightControl);
    controlDiv.appendChild(itControl);
    controlDiv.appendChild(sizeControl);
    controlDiv.appendChild(letterSpacingControl);
    controlDiv.appendChild(lineHeightControl);
    controlDiv.appendChild(alignControl);
    controlDiv.appendChild(style1Control);
    controlDiv.appendChild(style2Control);
    controlDiv.appendChild(style3Control);
    controlDiv.appendChild(caseControl);
    controlDiv.hidden = !settings.showControl;

    // The wrapper keeps the layout static even when the controls are hiding
    controlWrapper.className = "control-wrapper";
    controlWrapper.appendChild(controlDiv);
  }

  function createItalicsButton() {
    var button = document.createElement('i');
    button.className = "fa fa-italic"
    button.onclick = function() {
      isItalic = this.classList.contains('ctl-blue')
      if (isItalic)
        this.classList.remove('ctl-blue');
      else
        this.classList.add('ctl-blue');

      changeItalics(this, !isItalic)
    }
    return button;
  }

  // == Alignment ==
  function createAlignControl(alignment) {
    var alignIndex = controlInfo.alignments.indexOf(alignment);

    var div = document.createElement('div');
    div.className = "control-item align-control";

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

  function toStyleSet1Label(styleSet) {
    return "<span class='ss0" + styleSet + "';'>SsTt</span>"
  }

  function toStyleSet2Label(styleSet) {
    return "<span class='ss0" + (styleSet * 2) + "';'>an</span>"
  }

  function toStyleSet3Label(styleSet) {
    return "<span class='ss0" + (styleSet * 3) + "';'>i;!</span>"
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

  function updateFFS(ss, sample) {
    ffsString = "font-feature-settings: "
    for (var i = 0; i <= ss.length; i++) {
      if (ss[i] > 0) {
        ffsString = ffsString + '"ss0' + (i + 1) + '" 1,'
      }
    }
    ffsString = ffsString.slice(0,-1) + ";"

    // get existing styles, then add font-feature-settings
    sample.style.fontFeatureSettings = null
    var s = sample.style.cssText 
    s += " " + ffsString
    sample.setAttribute("style", s)
  }

  function changeStyleSet1(slider, values) {
    var value = values[slider.value];
    var line = slider.parentElement.parentElement.parentElement.parentElement;
    var sample = line.getElementsByClassName("sample")[0];

    styleSetOn[0] = value
    updateFFS(styleSetOn, sample)
  }

  function changeStyleSet2(slider, values) {
    var value = values[slider.value];
    var line = slider.parentElement.parentElement.parentElement.parentElement;
    var sample = line.getElementsByClassName("sample")[0];

    styleSetOn[1] = value
    updateFFS(styleSetOn, sample)
  }

  function changeStyleSet3(slider, values) {
    var value = values[slider.value];
    var line = slider.parentElement.parentElement.parentElement.parentElement;
    var sample = line.getElementsByClassName("sample")[0];

    styleSetOn[2] = value
    updateFFS(styleSetOn, sample)
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

  function changeItalics(iControl, value) {
    var line = iControl.parentElement.parentElement.parentElement.parentElement;
    var sample = line.getElementsByClassName("sample")[0];
    if (value) {
      sample.style.fontStyle = "italic"
    }
    else {
      sample.style.fontStyle = ""
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());
