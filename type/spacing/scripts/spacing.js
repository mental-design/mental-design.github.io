// Character Sets
var uppercase = [
  "A", "B", "C", "D", "E",
  "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O",
  "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z"
]

var lowercase = [
  "a", "b", "c", "d", "e",
  "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o",
  "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z"
]

var numerics = [
  "0", "1", "2", "3", "4",
  "5", "6", "7", "8", "9"
]

var extended = [
  "ı", "ȷ", "ĸ", "ſ",
  "Æ", "Œ", "Ð", "Þ", "Ŋ", "Ə", "ẞ",
  "æ", "œ", "ð", "þ", "ŋ", "ə", "ß"
]

var punctuation = [
  ".", ",", "!", "?", "&",
  "#", ":", ";", "%", "…",
  "_", "-", "–", "=", "+", "·",
  "'", "*", "^"
]

var mentalType = ["abc", "bam", "bass", "bau", "ocd"]

// Control info
var controlInfo = {
  sets: ["uppercase", "lowercase", "numerics", "extended", "punctuation"],
  weights: [100, 200, 300, 400, 500, 600, 700],
  sizes: sizes(8, 200, 50)
}

// Control params
var typeface = "bau"
var charSetName = "uppercase"
var ruler = undefined
var mainGlyph = undefined
var onLeft = undefined
var onRight = undefined
var weightIndex = undefined
var sizeIndex = undefined
var inLine = undefined

var weight = undefined
var size = undefined
var charSet = undefined

// Entry function
function initControlDiv(controlDiv) {
  // Load controls
  loadParams()
  
  // Size control
  var sizeControl = document.createElement('div')
  sizeControl.classList.add("control-div")
  SampleSlider.init(sizeControl,
                    size,
                    controlInfo.sizes,
                    "resources/font_size.svg",
                    changeSize)
  sizeControl.classList.add("size-control")
  
  // Weight control
  var weightControl = document.createElement('div')
  weightControl.classList.add("control-div")
  SampleSlider.init(weightControl,
                    weight,
                    controlInfo.weights,
                    "resources/font_weight.svg",
                    changeWeight)
  weightControl.classList.add("weight-control")

  // Char set control
  var charSetControl = document.createElement('div')
  charSetControl.classList.add("control-div")
  charSetControl.classList.add("bass")
  PreviewDropdown.init(charSetControl,
                       controlInfo.sets,
                       getCharSetIndex(charSetName),
                       changeCharSet)
  charSetControl.id = "char-select"

  // Glyph control
  var glyphControl = document.createElement('div')
  initGlyphControl(glyphControl)

  // Ruler control
  var rulerControl = document.createElement('div')
  rulerControl.id = "ruler-control"
  rulerControl.classList.add("control-div")

  var rulerInput = document.createElement('input')
  rulerInput.type = "text"
  rulerInput.id = "ruler-input"
  rulerInput.value = ruler
  rulerInput.onchange = function() {
    ruler = document.getElementById("ruler-input").value
    localStorage.setItem("ruler", ruler)
    updateMainGlyph(charSet)
  }

  rulerControl.appendChild(rulerInput)

  // Inline control
  var inlineCheckBox = document.createElement('input')
  inlineCheckBox.id = "inline-input"
  inlineCheckBox.type = "checkbox"
  inlineCheckBox.checked = inLine
  inlineCheckBox.onchange = function() {
    inLine = document.getElementById("inline-input").checked
    localStorage.setItem("inLine", inLine)
    updateSampleInline(inLine)
  }

  var inlineSpan = document.createElement('span')
  inlineSpan.classList.add("checkmark")

  var inlineContainer = document.createElement('label')
  inlineContainer.classList.add("container")
  inlineContainer.appendChild(inlineCheckBox)
  inlineContainer.appendChild(inlineSpan)

  var inlineTitle = document.createElement('span')
  inlineTitle.innerHTML = "Inline"

  var inlineControl = document.createElement('div')
  inlineControl.id = "inline-control"
  inlineControl.classList.add("control-div")
  inlineControl.appendChild(inlineContainer)
  inlineControl.appendChild(inlineTitle)
  
  // Assemble control div
  controlDiv.appendChild(charSetControl);
  charSetControl.classList.add('separator')
  controlDiv.appendChild(rulerControl)
  rulerControl.classList.add('separator')
  controlDiv.appendChild(glyphControl)
  glyphControl.classList.add('separator')
  controlDiv.appendChild(sizeControl)
  sizeControl.classList.add('separator')
  controlDiv.appendChild(weightControl)
  weightControl.classList.add('separator')
  controlDiv.appendChild(inlineControl)
}

function initGlyphControl(glyphControl) {
  glyphControl.id = "glyph-control"
  glyphControl.classList.add("control-div")

  var glyphInput = document.createElement('input')
  glyphInput.type = "text"
  glyphInput.id = "glyph-input"
  glyphInput.value = mainGlyph
  glyphInput.onchange = function() {
    mainGlyph = document.getElementById("glyph-input").value
    localStorage.setItem("mainGlyph", mainGlyph)

    updateMainGlyph(charSet)
  }

  var leftCheckBox = document.createElement('input')
  leftCheckBox.id = "glyph-left"
  leftCheckBox.type = "checkbox"
  leftCheckBox.checked = onLeft
  leftCheckBox.onchange = function() {
    onLeft = document.getElementById("glyph-left").checked
    localStorage.setItem("onLeft", onLeft)

    updateMainGlyph(charSet)
  }

  var leftSpan = document.createElement('span')
  leftSpan.classList.add("checkmark")

  var leftContainer = document.createElement('label')
  leftContainer.classList.add("container")
  leftContainer.appendChild(leftCheckBox)
  leftContainer.appendChild(leftSpan)

  var rightCheckBox = document.createElement('input')
  rightCheckBox.id = "glyph-right"
  rightCheckBox.type = "checkbox"
  rightCheckBox.checked = onRight
  rightCheckBox.onchange = function() {
    onRight = document.getElementById("glyph-right").checked
    localStorage.setItem("onRight", onRight)

    updateMainGlyph(charSet)
  }

  var rightSpan = document.createElement('span')
  rightSpan.classList.add("checkmark")

  var rightContainer = document.createElement('label')
  rightContainer.classList.add("container")
  rightContainer.appendChild(rightCheckBox)
  rightContainer.appendChild(rightSpan)

  glyphControl.appendChild(leftContainer)
  glyphControl.appendChild(glyphInput)
  glyphControl.appendChild(rightContainer)
}

function initSampleDiv(sampleDiv, fontName) {
  typeface = fontName

  // Create samples
  createSamples(sampleDiv, charSet)

  updateMainGlyph(charSet)
  updateWeights(weight)
  updateSizes(size)
}

function createSamples(sampleDiv, charSet) {
  for (var i = 0; i < charSet.length; i++) {
    var textDiv = document.createElement('div')
    textDiv.classList.add('sample')
    sampleDiv.appendChild(textDiv)

    let divGlyph = charSet[i]
    textDiv.id = "sample-" + divGlyph

    if (mentalType.includes(typeface)) {
      textDiv.classList.add(typeface)
    }
    else {
      textDiv.style.fontFamily = typeface
    }
  }
}

function getSpaceText(divGlyph) {
  let mainGlyph = document.getElementById("glyph-input").value
  let onLeft = document.getElementById("glyph-left").checked
  let onRight = document.getElementById("glyph-right").checked
  let ruler = document.getElementById("ruler-input").value

  var text = ruler
  if (onLeft)
    text += mainGlyph
  text += divGlyph
  if (onRight)
    text += mainGlyph
  text += ruler

  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function updateMainGlyph(charSet) {
  // Update samples
  for (var i = 0; i < charSet.length; i++) {
    let divGlyph = charSet[i]
    var sampleId = "sample-" + divGlyph
    
    var textDiv = document.getElementById(sampleId)
    textDiv.innerHTML = getSpaceText(divGlyph)
  }
  updateSampleInline(inLine)
}

function getTypeface() {
  var url_string = window.location.href
  var url = new URL(url_string);
  return url.searchParams.get("t");
}

function getCharSet(charSetName) {
  return eval(charSetName)
}

function getCharSetIndex(charSetName) {
  return controlInfo["sets"].findIndex(function(item){
    return item == charSetName
  })
}

/* =============== storage methods ================ */

function loadParams() {
  charSetName = localStorage.getItem("charSet")
  if (charSetName == undefined)
    charSetName = "uppercase"

  charSet = getCharSet(charSetName)

  ruler = localStorage.getItem("ruler")
  if (ruler == undefined)
    ruler = "HH"

  mainGlyph = localStorage.getItem("mainGlyph")
  if (mainGlyph == undefined)
    mainGlyph = "V"

  onLeft = localStorage.getItem("onLeft")
  if (onLeft == undefined)
    onLeft = true
  else
    onLeft = (onLeft == "true")

  onRight = localStorage.getItem("onRight")
  if (onRight == undefined)
    onRight = false
  else
    onRight = (onRight == "true")

  weightIndex = localStorage.getItem("weightIndex")
  if (weightIndex == undefined)
    weightIndex = 3
  weight = controlInfo["weights"][weightIndex]

  sizeIndex = localStorage.getItem("sizeIndex")
  if (sizeIndex == undefined)
    sizeIndex = 25
  size = controlInfo["sizes"][sizeIndex]

  inLine = localStorage.getItem("inLine")
  if (inLine == undefined)
    inLine = false
  else
    inLine = (inLine == "true")
}


/* =============== handle event methods ================ */
function changeSize(slider, sizes) {
  localStorage.setItem("sizeIndex", slider.value)
  size = sizes[slider.value]

  updateSizes(size)
}

function changeWeight(slider, weights) {
  localStorage.setItem("weightIndex", slider.value)

  weight = weights[slider.value]
  updateWeights(weight)
}

function changeCharSet(charSetName) {
  localStorage.setItem("charSet", charSetName)

  charSet = getCharSet(charSetName)

  var sampleDiv = document.getElementById('samples')

  // Remove previous samples
  sampleDiv.innerHTML = ''

  // Create new samples
  createSamples(sampleDiv, charSet)
  updateMainGlyph(charSet)
}

function updateSizes(size) {
  var sampleDiv = document.getElementById("samples")
  sampleDiv.style.fontSize = size + "pt"
}

function updateWeights(weight) {
  var sampleDiv = document.getElementById("samples")
  sampleDiv.style.fontWeight = weight
}

function updateSampleInline(inline) {
  var samples = document.getElementsByClassName("sample")
  for (var i = samples.length - 1; i >= 0; i--) {
    if (inline) {
      samples[i].classList.add('inline')
    }
    else {
      samples[i].classList.remove('inline')
    }
  }
}

/* =============== utility methods =============== */
function range(start, stop, count) {
  var rng = stop - start;
  var step = rng / (count-1);
  return [...Array(count).keys()].map(i => start + i * step);
}

function sizes(start, stop, count) {
  var lgArray = range(Math.log2(start), Math.log2(stop), count);
  var outArray = lgArray.map(i => Math.round(2 ** i));
  return outArray;
}