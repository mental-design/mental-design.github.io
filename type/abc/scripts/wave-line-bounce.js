class WaveLine {
  constructor() {
    this.isPlaying = false
    this.intervalID = undefined

    this.step = 1
    this.centerChar = 0
    this.weightList = []

    this.delay = 100
    this.delayFactor = []

    this.pulse = [700, 600, 500, 400, 300, 200, 100]
  }

  initDiv(div, data) {
    div.classList.add("wave-sample")

    var text = data.text
    var mode = data.mode
    var modeParams = data.params

    // Delay
    this.delay = modeParams.delay
    // Create delay array
    var alpha = 0.3
    var gamma = 2
    for (var i = 0; i < text.length; i++) {
      var value = (1 - alpha) + alpha * ((0.5 + Math.cos(2 * Math.PI * i / (text.length - 1)) * 0.5) ** gamma)
      this.delayFactor.push(value / (1 - alpha))
    }

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
  
    var _this = this
    playButton.onclick = function() {
      _this.isPlaying = !_this.isPlaying

      if (!_this.isPlaying) {  // Pause
      //   window.clearInterval(_this.intervalID)

        // Change button
        playButton.classList.add("fa-play-circle")
        playButton.classList.remove("fa-pause-circle")
      }
      else {  // Play
        // Change button
        playButton.classList.add("fa-pause-circle")
        playButton.classList.remove("fa-play-circle")

      //   _this.intervalID = setInterval(function() {
      //     _this.bounce(textDiv)
      //   }, modeParams.delay, textDiv)
        _this.bounce(textDiv, _this)
      }
    }

    // Initialize text weights
    this.updateWeights(this.centerChar)
    this.updateText(textDiv, this.weightList)
  
    div.appendChild(playButton)
    div.appendChild(textDiv)
  }

  /* =============== animation methods =============== */

  bounce(textDiv, _this) {
    if (_this.centerChar >= textDiv.childNodes.length - 1) {
        _this.step = -1;
    }
    if (_this.centerChar <= 0) {
        _this.step = 1;
    }

    _this.centerChar = _this.centerChar + _this.step
    
    _this.updateWeights(_this.centerChar)
    _this.updateText(textDiv, _this.weightList)

    if (_this.isPlaying) {
      var delay = _this.delay * _this.delayFactor[_this.centerChar]
      setTimeout(_this.bounce, delay, textDiv, _this)
    }
  }

  updateWeights(value) {
    // update weight list
    for (var i = 0; i < this.weightList.length; i++) {
      var distance = Math.min(Math.abs(i - value), this.pulse.length - 1)
      this.weightList[i] = this.pulse[distance]
    }
  }

  updateText(textDiv, weightList) {
    // update text
    var childList = textDiv.childNodes
    for (var i = 0; i < childList.length; i++) {
      var charSpan = childList[i]
      charSpan.style.fontWeight = weightList[i]
    }
  }
}