var PreviewSection = (function() {

  var codeMirror;

  // main init method
  function init(previewDiv) {
    // Randomize defaults
    defaults.langIndex = chooseFromArray([0, 2, 3, 4]);
    defaults.themeIndex = chooseFromArray([2, 3, 4, 7, 9]);

    previewDiv.classList.add("ss00");

    // Create Controller
    var controlDiv = document.createElement('div');
    initializeControls(controlDiv, controlInfo, defaults);
    previewDiv.appendChild(controlDiv);
    
    // Create Editor
    var codeMirrorDiv = document.createElement('div');
    initializeCodeMirror(codeMirrorDiv);
    previewDiv.appendChild(codeMirrorDiv);

    // Set defaults
    let defaultLang = controlInfo.langs[defaults.langIndex];
    let defaultTheme = controlInfo.themes[defaults.themeIndex];
    let defaultSize = controlInfo.sizes[defaults.sizeIndex];
    let defaultSpacing = controlInfo.spacing[defaults.spacingIndex];
    updateLang(defaultLang);
    updateTheme(defaultTheme);
    updateFontSize(defaultSize);
    updateLineSpacing(defaultSpacing);
  }

  // Control info
  var controlInfo = {
    langs: ["Javascript", "Markdown", "Python", "Swift", "C++"],
    themes: ["Colorforth", "Eclipse", "Lesser-Dark", "Lucario", "Mbo",
             "Monokai", "Moxer", "SSMS", "Twilight", "Vibrant-Ink",
             "Xq-Light"],
    sizes: [6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36],
    spacing: [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]
  };

  // Setup info
  var defaults = {
    langIndex: 2,
    themeIndex: 3,
    sizeIndex: 4,
    spacingIndex: 3
  };

  /* =============== initialize methods ================ */

  // ===== Editor =====
  function initializeCodeMirror(div) {
    div.classList.add("code-wrapper");
    codeMirror = CodeMirror(div, {
      viewportMargin: 100
    });
  }

  // ===== Controls =====
  function initializeControls(controlDiv, controlInfo, defaults) {
    // Setup controlDiv
    controlDiv.id = "editor-controls"
    controlDiv.classList.add("control");

    // Create languange selector
    var langDiv = document.createElement('div');
    PreviewDropdown.init(langDiv,
                         controlInfo.langs,
                         defaults.langIndex,
                         updateLang);
    langDiv.id = "lang-select";
    langDiv.classList.add('separator');
    controlDiv.appendChild(langDiv);

    // Create theme selector
    var themeDiv = document.createElement('div');
    PreviewDropdown.init(themeDiv,
                         controlInfo.themes,
                         defaults.themeIndex,
                         updateTheme);
    themeDiv.id = "theme-select";
    themeDiv.classList.add('separator');
    controlDiv.appendChild(themeDiv);

    // Create size slider
    var size = controlInfo.sizes[defaults.sizeIndex];
    var sizeControl = document.createElement('div');
    SampleSlider.init(sizeControl,
                      size,
                      controlInfo.sizes,
                      toSizeLabel,
                      changeSize);
    sizeControl.classList.add("size-control");
    sizeControl.classList.add('separator');
    controlDiv.appendChild(sizeControl);

    // Create size slider
    var spacing = controlInfo.spacing[defaults.spacingIndex];
    var spacingControl = document.createElement('div');
    SampleSlider.init(spacingControl,
                      spacing,
                      controlInfo.spacing,
                      function(d){return d.toFixed(1);},
                      changeSpacing);
    spacingControl.classList.add("spacing-control");
    controlDiv.appendChild(spacingControl);
  }

  /* =============== control callback methods ================ */

  function updateLang(langName) {
    var lang = langName.toLowerCase();

    let codeSample = cleanupCodeSample(document.getElementById(lang).innerHTML);
    codeMirror.setValue(codeSample);
    codeMirror.setOption("mode", toMode(lang));
  }

  function updateTheme(themeName) {
    let theme = themeName.toLowerCase();
    codeMirror.setOption("theme", theme);
  }

  function updateFontSize(size) {
    let cm = document.getElementsByClassName("CodeMirror")[0];
    cm.style.fontSize = toSizeLabel(size);
    codeMirror.refresh();
  }

  function updateLineSpacing(spacing) {
    let cm = document.getElementsByClassName("CodeMirror")[0];
    cm.style.lineHeight = spacing;
    codeMirror.refresh();
  }

  function changeSize(slider, sizes) {
    var size = sizes[slider.value];
    updateFontSize(size);
  }

  function changeSpacing(slider, spacings) {
    var spacing = spacings[slider.value];
    updateLineSpacing(spacing);
  }

  /* =============== utility methods =============== */

  function cleanupCodeSample(codeSample) {
    return codeSample.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  function toMode(lang) {
    if (lang == 'html') {
      return 'htmlmixed';
    }
    else if (lang == 'c++') {
      return 'cpp';
    }
    else {
      return lang;
    }
  }

  function toSizeLabel(size) {
    return Math.round(size) + "pt";
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function chooseFromArray(array) {
    return array[getRandomInt(array.length)];
  }

  /* =============== export public methods =============== */

  return {
    init: init
  };
}());