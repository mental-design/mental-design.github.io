var ImagePlayer = (function() {

  var isPlaying = false

  function selectImage(idx, img, capDiv, imageList, capList) {
    img.src = imageList[idx]
    capDiv.innerHTML = capList[idx]
  }

  function selectPage(idx, pgIndicator) {
    if (pgIndicator == undefined) return

    var dots = pgIndicator.children
    for (var i = dots.length - 1; i >= 0; i--) {
      var dot = dots[i]

      if (i == idx) {
        if (dot.classList.contains("fa-circle-o"))
          dot.classList.remove("fa-circle-o")
        dot.classList.add("fa-circle")
      }
      else {
        if (dot.classList.contains("fa-circle")) {
          dot.classList.remove("fa-circle")
          dot.classList.add("fa-circle-o")
        }
      }
    }
  }

  // main init method
  function init(div, imageList, capList, delay, slideMode=false) {
    div.classList.add("imgplay")

    var currIndex = 0

    // Image
    var img = document.createElement("img")
    img.classList.add('imgplay-img')
    img.src = imageList[0]

    var capDiv = document.createElement("div")
    capDiv.classList.add('imgplay-caption')
    capDiv.innerHTML = capList[0]

    // Page Indicator
    var pgIndicator = document.createElement("div")
    pgIndicator.classList.add("imgplay-page")
    for (var i = 0; i < imageList.length; i++) {
      dot = document.createElement("i")
      dot.classList.add("fa")
      dot.classList.add("fa-circle-o")
      dot.classList.add("imgplay-dot")
      pgIndicator.appendChild(dot)
    }

    // Play Button
    if (!slideMode) {
      var playButton = document.createElement("i")
      playButton.classList.add("fa")
      playButton.classList.add("fa-play-circle")
      playButton.classList.add("imgplay-btn")

      // Add interaction
      playButton.onclick = function() {
        if (isPlaying) return

        isPlaying = true
        playButton.classList.add("imgplay-disable")
        selectImage(currIndex, img, capDiv, imageList, capList)
        selectPage(currIndex, pgIndicator)

        _currIndex = 1;
        var intervalID = setInterval(function(){
          selectImage(currIndex, img, capDiv, imageList, capList)
          selectPage(currIndex, pgIndicator)

          if (++_currIndex === imageList.length) {
            window.clearInterval(intervalID)
            isPlaying = false
            playButton.classList.remove("imgplay-disable")
          }
        }, delay)
      }
    }
    else {
      // FWD/BCK buttons
      var fwdButton = document.createElement("i")
      fwdButton.classList.add("fa")
      fwdButton.classList.add("fa-chevron-circle-right")
      fwdButton.classList.add("imgplay-slide-btn")
      fwdButton.onclick = function() {
        currIndex = currIndex + 1
        if (currIndex >= imageList.length)
          currIndex = 0
        selectImage(currIndex, img, capDiv, imageList, capList)
        selectPage(currIndex, pgIndicator)
      }

      var bckButton = document.createElement("i")
      bckButton.classList.add("fa")
      bckButton.classList.add("fa-chevron-circle-left")
      bckButton.classList.add("imgplay-slide-btn")
      bckButton.onclick = function() {
        currIndex = currIndex - 1
        if (currIndex < 0)
          currIndex = imageList.length - 1
        selectImage(currIndex, img, capDiv, imageList, capList)
        selectPage(currIndex, pgIndicator)
      }
    }

    // Assemble div
    if (slideMode) {
      div.appendChild(bckButton)
      div.appendChild(img)
      div.appendChild(fwdButton)
    }
    else {
      div.appendChild(playButton)
      div.appendChild(img)
    }

    div.appendChild(pgIndicator)
    div.appendChild(capDiv)

    // Initialize
    selectPage(currIndex, pgIndicator)

    // Preload images
    preload(imageList)
  }
  
  /* =============== utility methods =============== */
  var images = [];
  function preload(imageList) {
      for (var i = 0; i < imageList.length; i++) {
          images[i] = new Image()
          images[i].src = imageList[i]
      }
  }
  
  /* =============== export public methods =============== */
  return {
    init: init
  }
}())