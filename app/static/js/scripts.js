$(document).ready(function() {

    let header = $("#header")
    let projects = $("#projects")
    let projectsOffset = projects.offset()
    let mapCanvasOffset = $("#map-canvas").offset()
    let burger = $("#hamburger");
    let drop = $("#dropdown");

    function getDomElevents(){
        header = $("#header")
        projects = $("#projects")
        projectsOffset = projects.offset()
        mapCanvasOffset = $("#map-canvas").offset()

        burger = $("#hamburger");
        drop = $("#dropdown");
    }

    //==========================================
    // loading cover
    //==========================================
    window.onscroll = function () { window.scrollTo(0, 0); };
    $('#page').hide();
    $(window).on('load', function() {
        window.onscroll = setNav
        $('#page').show(function(){
            $(document).scrollTop(0)
            $("#cover").fadeOut(200);
            getDomElevents();
        });
    });

    //==========================================
    // mobile nav
    //==========================================
    
    burger.on('click', function(e) {
        e.preventDefault();
        burger.data('open', !drop.attr('open'));
        drop.slideToggle("fast");
    });
    
    drop.find("a").on("click", function(e) {
        burger.data('open', false)
        drop.slideToggle(); 
    });

    function hideDropdown(){
        if (burger.data('open')){
            burger.data('open', false);
            drop.slideUp();
        }
    }
    //==========================================
    // Hero / Nav
    //==========================================
    function setHeroHeight(params) {
        windowHeight = $(window).height();
        headerContainerHeight = $("header").height();
        height = windowHeight - headerContainerHeight > 410 ? windowHeight - headerContainerHeight : 410;
        $('#row-hero').css('height', height);
    }
    setHeroHeight();
    
    function setNav(){
        hideDropdown()
        let scrollTop = $(this).scrollTop()
        // down the page
        if (scrollTop >= 60){
            header.addClass("nav-fixed")
            if (scrollTop <= projectsOffset.top - 200) {
                activateNav("home");
            } 
            else if (scrollTop <= mapCanvasOffset.top - 200 ){
                activateNav("projects");
            } 
            else {
                activateNav("contact");
            }
        } 
        // in the header
        else {
            header.removeClass("nav-fixed")
        }
    }
    setNav();
    
    function activateNav(str){
        let nav = header.find("[data-nav='"+str+"']")
        if (!nav.hasClass('active')) {
            header.find(".active").removeClass("active")
            header.find("[data-nav='"+str+"']").addClass("active")
        }
    }

    // scroll to element with #id
    $("a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var dest = $.attr(this, "href")
        var offset = dest == '#projects' ? 55 : 0
        if (dest.length) {
            $('html, body').animate({
                scrollTop: $(dest).offset().top - offset
            }, 'slow', function(){
                if (dest == '#contact') $("#field1").focus()
            });
        } else {
            window.location.replace('/'+$(this).attr('href'));
        }
    });

    // window resize
    $(window).resize(function() {
        if ($(this).width() >= 691) {
            burger.data('open', false)
            drop.css('display', 'none')
        }
        setHeroHeight()
    });

    // AJAX Form
    $('#contact-form').submit(function(e){
        e.preventDefault();
        $('#err').hide();
        $('#success').hide();
        $('#sendbtn').html("Sending")

        const url = $(this).attr('action');
        const data = $(this).serialize();
        $.post(url, data, function(data, status){
            $('#sendbtn').html("Send")
            if (data && data.status){
                $("#contact-form")[0].reset();
                $('#err').hide();
                $('#success').show();
            } else {
                $('#success').hide();
                $('#err').show();
            }
        });
    })


    console.log("Eli Byers - Software Engineer")
    console.log("");
    console.log("Thank you for ckecking out my portfolio.")
    console.log("Please reach out if you want to know more!")
});

