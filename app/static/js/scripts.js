$(document).ready(function() {

    let header, hacks, projects, hacksOffset, projectsOffset, burger, drop

    function getDomElements(){
        header = $("#header")
        hacks = $("#hacks")
        projects = $("#projects")

        hacksOffset = hacks.offset()
        projectsOffset = projects.offset()

        burger = $("#hamburger");
        drop = $("#dropdown");
    }

    getDomElements()

    //==========================================
    // loading cover
    //==========================================
    window.onscroll = function () { window.scrollTo(0, 0); };
    $(window).on('load', function() {
        window.onscroll = setNav
        $('#page').show(function(){
            getDomElements();
            $(document).scrollTop(0)
            $("#cover").fadeOut(200);
        });
    });

    //==========================================
    // mobile nav
    //==========================================
    
    burger.on('click', function(e) {
        e.preventDefault();
        burger.data('open', !drop.attr('open'));
        drop.toggle();
    });
    
    drop.find("a").on("click", function(e) {
        burger.data('open', false)
        drop.toggle(); 
    });

    function hideDropdown(){
        if (burger.data('open')){
            burger.data('open', false);
            drop.hide();
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
        let preset = 200
        // down the page
        if (scrollTop >= 60){
            
            header.addClass("nav-fixed")
            if (scrollTop <= hacksOffset.top - preset) {
                activateNav();
            } 
            else if (scrollTop <= projectsOffset.top - preset){
                activateNav("hacks");
            } else {
                activateNav("projects");
            }
        } 
        // in the header
        else {
            header.removeClass("nav-fixed")
        }
    }
    setNav();
    
    function activateNav(str){
        header.find(".active").removeClass("active")
        console.log(str);
        
        if (str) {
            nav = "[data-nav='"+str+"']"
            header.find(nav).addClass("active")
        }
    }

    // scroll to element with #id
    $("a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var dest = $.attr(this, "href")
        var offset = 55
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


    console.log("Eli Byers - Software Engineer")
    console.log("");
    console.log("Thank you for ckecking out my portfolio.")
    console.log("Please reach out if you want to know more!")
});

