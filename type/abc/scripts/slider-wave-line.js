class SliderWaveLine {
  constructor() {
    this.weightList = []
  }

  initDiv(div, data) {
    div.classList.add("wave-sample")
    div.classList.add("abc")

    var text = data.text
    var mode = data.mode
    var modeParams = data.params

    // Add play button
    var playButton = document.createElement("i")
    playButton.classList.add("fa")
    playButton.classList.add("fa-play-circle")
    playButton.classList.add("wave-btn")

    var textDiv = document.createElement("div")
    textDiv.classList.add("wave-text")
    this.textDiv = textDiv

    // Add text
    for (var i = 0; i < text.length; i++) {
      var charSpan = document.createElement('span')
      charSpan.innerHTML = text.charAt(i)
      textDiv.appendChild(charSpan)
      this.weightList.push(400)
    }

    textDiv.style.fontSize = modeParams.size + "pt"
    if (screen.width > 600) {
      textDiv.style.fontSize = modeParams.size + "pt"
    }
    else { // mobile
      if ("smallScreen" in modeParams) {
        textDiv.style.fontSize = modeParams.smallScreen.size + "pt"
      }
      else {
        textDiv.style.fontSize = modeParams.size + "pt"
      }
    }

    // Hide play button
    playButton.classList.add("wave-disable")

    // Add slider
    var slider = document.createElement("input")
    slider.classList.add("slider")
    slider.classList.add("wave-slider")
    slider.type = "range"
    slider.min = 0
    slider.max = text.length - 1
    slider.value = 3  // TODO: make this a parameter
    slider.step = 1
    var _this = this
    slider.oninput = function() {
      _this.updateWeights(this.value)
      _this.updateText(textDiv, _this.weightList)
    }

    textDiv.append(slider)

    // Initialize text weights
    this.updateWeights(slider.value)
    this.updateText(textDiv, this.weightList)

    div.appendChild(playButton)
    div.appendChild(textDiv)
  }

  updateWeights(value) {
    // update weight list
    for (var i = 0; i < this.weightList.length; i++) {
      var distance = Math.min(Math.abs(i - value), 6)
      var weight = (7 - distance) * 100
      this.weightList[i] = weight
    }
  }

  updateText(textDiv, weightList) {
    // update text
    var childList = textDiv.childNodes
    for (var i = 0; i < weightList.length; i++) {
      var charSpan = childList[i]
      charSpan.style.fontWeight = weightList[i]
    }
  }
}