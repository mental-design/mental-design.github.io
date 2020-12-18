var SampleSlider = (function() {

  // main init method
  function init(controlDiv, value, values, toLabel, callback) {
    controlDiv.classList.add("control-item");

    // Label
    var label = document.createElement("div");
    label.classList.add("control-label");

    if (typeof toLabel == "function") {
      label.innerHTML = toLabel(value);
      controlDiv.appendChild(label);
    }
    else {  // SVG icon
      var icon = document.createElement("img");
      icon.classList.add("control-icon");
      icon.src = toLabel;
      controlDiv.appendChild(icon);
    }

    // Slider
    var slider = document.createElement('input');
    initializeSlider(slider, value, values, toLabel, callback);
    controlDiv.appendChild(slider);
  }

  /* =============== initialize methods ================ */

  function initializeSlider(slider, value, valueArray, toLabel, callback) {
    slider.classList.add('slider');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', 0);
    slider.setAttribute('max', valueArray.length - 1);
    slider.value = valueArray.indexOf(value);

    slider.oninput = function() {
      if (typeof toLabel == "function") {
        // Update the label
        var label = this.parentElement.getElementsByClassName("control-label")[0];
        label.innerHTML = toLabel(valueArray[this.value]);
      }

      // Callback
      callback(this, valueArray);
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());