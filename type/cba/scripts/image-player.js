var ImagePlayer = (function() {

  var isPlaying = false

  // main init method
  function init(div, imageList, captionList, delay) {
    div.classList.add("imgplay")

    // Play Button
    var playButton = document.createElement("i")
    playButton.classList.add("fa")
    playButton.classList.add("fa-play-circle")
    playButton.classList.add("imgplay-btn")

    // Image
    var img = document.createElement("img")
    img.classList.add('imgplay-img')
    img.src = imageList[0]

    var captionDiv = document.createElement("div")
    captionDiv.classList.add('imgplay-caption')
    captionDiv.innerHTML = captionList[0]

    // Add interaction
    playButton.onclick = function() {
      if (isPlaying) return

        isPlaying = true
        playButton.classList.add("imgplay-disable")
        img.src = imageList[0]
        captionDiv.innerHTML = captionList[0]

        var counter = 1;
        var intervalID = setInterval(function(){
          img.src = imageList[counter]
          captionDiv.innerHTML = captionList[counter]

          if (++counter === imageList.length) {
            window.clearInterval(intervalID)
            isPlaying = false
            playButton.classList.remove("imgplay-disable")
          }
        }, delay)
    }

    // Assemble div
    div.appendChild(playButton)
    div.appendChild(img)
    div.appendChild(captionDiv)

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