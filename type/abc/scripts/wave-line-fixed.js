class FixedWaveLine {
  constructor() {
    this.weights = Array.from({length: 7}, (_, i) => (i + 1) * 100)
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
    for (var i = 0; i < text.length; i++) {
      var charSpan = document.createElement('span')
      charSpan.innerHTML = text.charAt(i)
      textDiv.appendChild(charSpan)
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

    // Hide play button
    playButton.classList.add("wave-disable")

    // setup text
    if ("weights" in modeParams) {
      var wIndex = modeParams.weights
      var childList = textDiv.childNodes
      for (var i = 0; i < childList.length; i++) {
        childList[i].style.fontWeight = this.weights[wIndex[i]]
      }
    }

    div.appendChild(playButton)
    div.appendChild(textDiv)
  }
}