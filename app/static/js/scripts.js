$(document).ready(function() {

    //==========================================
    // mobild nav                               
    //==========================================
    var burger = $("#hamburger")                
    var drop = $("#dropdown");                  
    
    burger.on('click', function(e) {
        e.preventDefault()                   
        burger.data('open', !drop.attr('open'));
        drop.slideToggle("fast")                
    })                                          
    
    drop.find("a").on("click", function(e) {     
        burger.data('open', false)
        drop.slideToggle()                   
    })                                          

    function hideDropdown(){
        if (burger.data('open')){
            burger.data('open', false)
            drop.slideToggle()  
        }
    }
    //==========================================//

    // hero = $("#row-hero")
    // clients = $("#clients")
    // clientsOffset = clients.offset()
    // contactOffset = $("#contact").offset()
    
    header = $("#header")
    projects = $("#projects")
    projectsOffset = projects.offset()
    mapCanvasOffset = $("#map-canvas").offset()

    // heightDifference = $(window).height() - (hero.outerHeight() + header.outerHeight() + clients.outerHeight())
    
    $(window).scroll(function() {
        hideDropdown()

        // if bellow header
        if ($(this).scrollTop() >= projectsOffset.top - 58){

            if (header.hasClass("default")){
                header.hide().removeClass("default").addClass("nav-fixed").fadeIn()
            }

            if ($(this).scrollTop() > projectsOffset.top - 200){
                var projects = header.find("[data-nav='projects']") 
                if (!projects.hasClass('active')) {
                    header.find(".active").removeClass("active")
                    header.find("[data-nav='projects']").addClass("active")
                }
            }
            
            if ($(this).scrollTop() > mapCanvasOffset.top - 200){
                var contact = header.find("[data-nav='contact']") 
                if (!contact.hasClass('active')) {
                    header.find(".active").removeClass("active")
                    header.find("[data-nav='contact']").addClass("active")
                }
            }
        } 
        // in the header
        else if(header.hasClass("nav-fixed")){
            header.removeClass("nav-fixed").addClass("default")
            header.find(".active").removeClass("active")
            header.find("[data-nav='home']").addClass("active")
        }
    })
    
    // scroll to element with #id
    $("a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var dest = $.attr(this, "href")
        var offset = dest == '#projects' ? 57 : 0
        if (dest.length) {
            $('html, body').animate({
                scrollTop: $(dest).offset().top - offset
            }, 'slow');
            if (dest == '#contact') $("#field1").focus()
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
      });

});
