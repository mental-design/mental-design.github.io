var NotesSection = (function() {

  // main init method
  function init(div, url, callback=null) {
    fetchData(url, function(content){
      div.innerHTML = marked(content);
      if (callback)
        callback()
    });
  }

  /* =============== data fetch methods =============== */
  function fetchData(url, callback) {
    var notesRequest = fetch(url)
      .then(function(response) {
         return response.text()
      });

    Promise.all([notesRequest])
      .then(function(values){
        callback(values[0]);
    });
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
}());