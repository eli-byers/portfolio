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

        let scrollTop = $(this).scrollTop()
        // if (!header.fixed) {
        //     header.fixed = true
        //     header.toggleClass('default', 50).toggleClass('nav-fixed', 50);
        //     console.log("asdf")
        // }

        // if bellow header
        if (scrollTop >= 60){

            if (header.hasClass("default")){
                header.hide().removeClass("default").addClass("nav-fixed").fadeIn()
            }
 
            if (scrollTop <= projectsOffset.top - 200) {
                activateNav("home")
            } 
            
            if (scrollTop > projectsOffset.top - 200 && scrollTop <= mapCanvasOffset.top - 200 ){
                activateNav("projects")
            } 
            
            if (scrollTop > mapCanvasOffset.top - 200){
                activateNav("contact")
            }
        } 
        // in the header
        else if(header.hasClass("nav-fixed")){
            header.removeClass("nav-fixed").addClass("default")
        }
    })
    
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
