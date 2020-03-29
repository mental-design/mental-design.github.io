var SampleSlider = (function() {

  // main init method
  function init(controlDiv, value, values, toLabel, callback) {
    controlDiv.className = "control-item";

    // Label
    var label = document.createElement('div');
    label.className = 'control-label';
    label.innerHTML = toLabel(value);
    controlDiv.appendChild(label);

    // Slider
    var slider = document.createElement('input');
    initializeSlider(slider, value, values, toLabel, callback);
    controlDiv.appendChild(slider);
  }

  /* =============== initialize methods ================ */

  function initializeSlider(slider, value, valueArray, toLabel, callback) {
    slider.className = 'slider';
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', 0);
    slider.setAttribute('max', valueArray.length - 1);
    slider.value = valueArray.indexOf(value);

    slider.oninput = function() {
      // Update the label
      var label = this.parentElement.getElementsByClassName("control-label")[0];
      label.innerHTML = toLabel(valueArray[this.value]);

      // Callback
      callback(this, valueArray);
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());