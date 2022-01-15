class PropWaveLine {
  constructor() {
    this.isPlaying = false
    this.intervalID = undefined

    this.step = 1
    this.centerChar = 0
    this.weightList = []
    this.pulse = [100, 200, 200, 200, 300, 300, 400, 500, 700, 600]
    this.pCounter = 0
  }

  initDiv(div, data) {
    div.classList.add("wave-sample")

    var text = data.text
    var mode = data.mode
    var modeParams = data.params

    // Add play button
    var playButton = document.createElement("i")
    playButton.classList.add("fa")
    playButton.classList.add("fa-arrow-circle-right")
    playButton.classList.add("wave-btn")

    var textDiv = document.createElement("div")
    textDiv.classList.add("wave-text")
    this.textDiv = textDiv

    // Add text
    let kern1List = ["r", "t"]
    let kern2List = ["e", "o"]
    for (var i = 0; i < text.length; i++) {
      let thisChar = text.charAt(i)

      var charSpan = document.createElement('span')
      charSpan.innerHTML = thisChar
      textDiv.appendChild(charSpan)
      this.weightList.push(100)

      // add kerning for [r, t] + @o
      if (kern1List.includes(thisChar)) {
        let nextChar = text.charAt(i + 1)
        if (kern2List.includes(nextChar)) {
          charSpan.classList.add("wave-kern-" + thisChar)
        }
      }
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
      if (!_this.isPlaying) {  // Start loop
        _this.intervalID = setInterval(function() {
          _this.updateWeights()
          _this.updateText(textDiv, _this.weightList)

          _this.checkForStop()
        }, modeParams.delay)

        _this.isPlaying = true
      }

      _this.pCounter = _this.pulse.length - 1
    }

    // Initialize text weights
    this.updateText(textDiv, this.weightList)
  
    div.appendChild(playButton)
    div.appendChild(textDiv)
  }

  checkForStop() {
    // Stop if all the weights are the same
    const firstValue = this.weightList[0]
    var allEqual = this.weightList.every(x => x == firstValue)
    if (allEqual) {
        window.clearInterval(this.intervalID)
        this.isPlaying = false
    }
  }

  updateWeights() {
    this.weightList.unshift(this.pulse[this.pCounter])
    this.weightList.pop()

    if (this.pCounter > 0) {
      this.pCounter--
    }
  }

  updateText(textDiv) {
    // update text
    var childList = textDiv.childNodes
    for (var i = 0; i < childList.length; i++) {
      var charSpan = childList[i]
      charSpan.style.fontWeight = this.weightList[i]
    }
  }
    
}