function lazyLoad() {
  var lazy = document.getElementsByClassName("lazy");
  for (var i = 0; i < lazy.length; i++) {
    lazy[i].src = lazy[i].getAttribute("data-src");
  }
}

function registerListener(event, func) {
  if (window.addEventListener) {
    window.addEventListener(event, func);
  } else {
    window.attachEvent("on" + event, func);
  }
}
registerListener("load", lazyLoad);
