var PreviewDropdown = (function() {

  var DOM = {};
  var listenerMap = {};

  // main init method
  function init(controlItem, menuList, selectedIndex, callback) {
    controlItem.classList.add('control-item');

    // Create button
    var button = document.createElement('div');
    let value = menuList[selectedIndex];
    initializeButton(button, value);
    controlItem.appendChild(button);

    // Create dropdown menu
    var dropMenu = document.createElement('div');
    initializeDropMenu(dropMenu, menuList, callback);
    controlItem.appendChild(dropMenu);
  }

  /* =============== create methods ================ */

  function initializeButton(button, value) {
    button.classList.add("drop-control");
    button.onclick = function(event) {
      let menuElement = this.parentElement;
      let dropMenu = menuElement.children[1];
      let show = isMenuHidden(dropMenu);
      showMenu(menuElement, show);
    };
    
    // Create label
    var label = document.createElement('div');
    label.classList.add("drop-label");
    label.innerHTML = value;
    button.appendChild(label);

    // Create icons
    var icon = document.createElement('i');
    icon.classList.add("fa");
    icon.classList.add("fa-caret-down");
    icon.classList.add("drop-icon");
    icon.classList.add("item-blue");
    button.appendChild(icon);
  }

  function initializeDropMenu(dropMenu, menuList, callback) {
    dropMenu.classList.add("w3-dropdown-content");
    dropMenu.classList.add("w3-bar-block");
    dropMenu.classList.add("w3-border");
    dropMenu.classList.add("drop-menu");

    // Add menu items
    for (let value of menuList) {
      var menuItem = document.createElement('span');
      initializeMenuItem(menuItem, value, callback); 
      dropMenu.appendChild(menuItem);
    }
  }

  function initializeMenuItem(menuItem, value, callback) {
    menuItem.classList.add("w3-button");
    menuItem.classList.add("w3-bar-item");
    menuItem.classList.add("drop-item");
    menuItem.innerHTML = value;
    menuItem.onclick = function() {
      var v = this.innerHTML;
      callback(v);

      // Update UI
      var x = this.parentElement.parentElement.getElementsByClassName('drop-label')[0];
      x.innerHTML = v;

      // Close the modal
      let menuElement = this.parentElement.parentElement;
      showMenu(menuElement, false);
    }
  }

  /* =============== handle event methods ================ */

  function isMenuHidden(menuElement) {
    return !menuElement.classList.contains("w3-show");
  }

  function showMenu(menuElement, show) {
    var downDownId = menuElement.id;
    var downMenu = menuElement.children[1];

    // Show/hide menu list
    if(show) {
      downMenu.classList.add("w3-show");
      
      var listener = hideOnClickOutside(menuElement);
      listenerMap[downDownId] = listener;
    }
    else {
      downMenu.classList.remove("w3-show");
      
      var listener = listenerMap[downDownId];
      if (listener) {
        document.removeEventListener('click', listener);
      }
    }

    // Flip arrow
    let arrow = menuElement.children[0].children[1];
    if(show) {
      arrow.classList.replace("fa-caret-down", "fa-caret-up");
    }
    else {
      arrow.classList.replace("fa-caret-up", "fa-caret-down");
    }
  }

  /* =============== utility methods =============== */
  function hideOnClickOutside(element) {
    var outsideClickListener = function(event) {
      if (!element.contains(event.target) && !isMenuHidden(element.children[1])) {
        showMenu(element, false);
      }
    }

    document.addEventListener('click', outsideClickListener);
    return outsideClickListener;
  }

  /* =============== export public methods =============== */
  
  return {
    init: init
  };
}());