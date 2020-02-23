$(document).ready(function() {
  let header = $("#header");
  let hacksOffset = $("#hacks").offset();
  let projectsOffset = $("#projects").offset();
  let arcadeOffset = $("#arcade").offset();
  let burger = $("#hamburger");
  let drop = $("#dropdown");

  function getDomElements() {
    header = $("#header");

    hacksOffset = $("#hacks").offset();
    projectsOffset = $("#projects").offset();
    arcadeOffset = $("#arcade").offset();

    burger = $("#hamburger");
    drop = $("#dropdown");
  }

  function isMobileDevice() {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  }

  //==========================================
  // loading cover
  //==========================================
  window.onscroll = function() {
    window.scrollTo(0, 0);
  };
  $(window).on("load", function() {
    window.onscroll = setNav;
    $("#page").show(function() {
      getDomElements();
      $(document).scrollTop(0);
      $("#cover").fadeOut(200);
    });
  });

  //==========================================
  // mobile nav
  //==========================================

  burger.on("click", function(e) {
    e.preventDefault();
    burger.data("open", !drop.attr("open"));
    drop.toggle();
  });

  drop.find("a").on("click", function(e) {
    burger.data("open", false);
    drop.toggle();
  });

  function hideDropdown() {
    if (burger && burger.data("open")) {
      burger.data("open", false);
      drop.hide();
    }
  }
  //==========================================
  // Hero / Nav
  //==========================================
  function setHeroHeight() {
    windowHeight = $(window).height();
    headerContainerHeight = $("header").height();
    heroHeight = windowHeight - headerContainerHeight;
    $("#row-hero").css("height", heroHeight);
  }
  setHeroHeight();

  function setNav() {
    if (!header) return;

    hideDropdown();
    let scrollTop = $(this).scrollTop();
    let preset = -58;
    // in the header
    if (scrollTop < 60) {
      header.removeClass("nav-fixed");
    }
    // down the page
    else {
      header.addClass("nav-fixed");
      if (scrollTop <= projectsOffset.top + preset) {
        activateNav();
      } else if (scrollTop <= hacksOffset.top + preset) {
        activateNav("projects");
      } else if (isMobileDevice() || scrollTop <= arcadeOffset.top + preset) {
        activateNav("hacks");
      } else {
        activateNav("arcade");
      }
    }
  }
  setNav();

  function activateNav(str) {
    header.find(".active").removeClass("active");
    if (str) {
      nav = "[data-nav='" + str + "']";
      header.find(nav).addClass("active");
    }
  }

  // scroll to element with #id
  $("a[href^='#']").on("click", function(e) {
    e.preventDefault();
    var dest = $.attr(this, "href");
    var offset = 55;
    if (dest.length) {
      $("html, body").animate(
        {
          scrollTop: $(dest).offset().top - offset
        },
        "slow",
        function() {
          if (dest == "#contact") $("#field1").focus();
        }
      );
    } else {
      window.location.replace("/" + $(this).attr("href"));
    }
  });

  // window resize
  $(window).resize(function() {
    if ($(this).width() >= 691) {
      burger.data("open", false);
      drop.css("display", "none");
    }
    setHeroHeight();
  });

  //==========================================
  // Video Modal
  //==========================================
  var $videoSrc;
  $(".video-btn").click(function() {
    $videoSrc = $(this).data("src");
  });

  // when the modal is opened autoplay it
  $("#videoModal").on("shown.bs.modal", function(e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr(
      "src",
      $videoSrc +
        "?rel=0&mute=1&autoplay=1&modestbranding=1&showinfo=0&origin=http://elibyers.com"
    );
  });

  // stop playing the youtube video when I close the modal
  $("#videoModal").on("hide.bs.modal", function(e) {
    // a poor man's stop video
    $("#video").attr("src", "");
  });

  console.log("Thank you for visiting my portfolio!");
});
