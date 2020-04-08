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
                      changeWeight);
    weightControl.classList.add("weight-control");
    weightControl.classList.add("separator");
    
    var sizeControl = document.createElement('div');
    SampleSlider.init(sizeControl,
                      settings.size,
                      controlInfo.sizes,
                      toSizeLabel,
                      changeSize);
    sizeControl.classList.add("size-control");
    sizeControl.classList.add("separator");

    var alignControl = createAlignControl(settings.alignment);

    var controlDiv = document.createElement('div');
    controlDiv.className = "control";
    controlDiv.appendChild(weightControl);
    controlDiv.appendChild(sizeControl);
    controlDiv.appendChild(alignControl);
    controlDiv.hidden = true;

    // The wrapper keeps the layout static even when the controls are hiding
    controlWrapper.className = "w3-center control-wrapper";
    controlWrapper.appendChild(controlDiv);
  }

  // == Alignment ==
  function createAlignControl(alignment) {
    var alignIndex = controlInfo.alignments.indexOf(alignment);

    var div = document.createElement('div');
    div.className = "control-item align-control control-last";

    var alignTags = ['left', 'center', 'right'];
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

  function toSizeLabel(size) {
    return size + "px";
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
    sample.style.fontSize = size + "px";
  }

  function changeAlign(aControl, index, alignments) {
    var align = alignments[index];
    // TODO: Find a cleaner way to access the line without using id
    var line = aControl.parentElement.parentElement.parentElement.parentElement;

    // Update the alignment
    var sample = line.getElementsByClassName("sample")[0];
    sample.classList.remove(sample.classList[sample.classList.length - 1]);
    // Note: this assumes the last class is the alignment.
    // TODO: write code to find the alignment
    sample.classList.add('w3-' + align);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());