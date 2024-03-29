class SliderWaveLine {
  constructor() {
    this.weightList = []

    this.pulse = [700, 600, 400, 200, 200, 100]
  }

  initDiv(div, data) {
    div.classList.add("wave-sample")

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
    slider.value = Math.round((text.length - 1)/2 - 1)
    slider.step = 1
    var _this = this
    slider.oninput = function() {
      _this.updateWeights(this.value)
      _this.updateText(textDiv, _this.weightList)
    }

    // Firefox will not infer the width from the text.
    var isFirefox = (typeof InstallTrigger !== 'undefined')
    if (isFirefox) {
      if (screen.width > 600) {
        slider.style.width = "400px"
      }
      else {
        slider.style.width = "240px"
      }
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
      var distance = Math.min(Math.abs(i - value), this.pulse.length - 1)
      this.weightList[i] = this.pulse[distance]
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