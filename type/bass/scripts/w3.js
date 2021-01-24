

function adjustToNavbar() {
  var navBarHeight = document.getElementById("top-bar").clientHeight;
  var navMenu = document.getElementById("mobileNav");
  navMenu.style.marginTop = navBarHeight + "px";
  var contentDiv = document.getElementById("content");
  contentDiv.style.marginTop = navBarHeight + "px";

  // adjust for navbar
  window.addEventListener("hashchange", function(ev) { 
    var adjust = -navBarHeight;
    if (location.hash === "#donate") {
      adjust += -16;
    }
    scrollBy(0, adjust);
  });
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
  var navMenu = document.getElementById("mobileNav");
  if (navMenu.className.indexOf("w3-show") == -1) {
    navMenu.classList.add("w3-show");
  } else { 
    navMenu.classList.remove("w3-show");
  }
}

function hideMenu() {
  var navMenu = document.getElementById("mobileNav");
  navMenu.classList.remove("w3-show");
}