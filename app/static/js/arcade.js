$(document).ready(function() {


    //==========================================
    // Hero / Nav
    //==========================================
    function setNav(){
        let header = $('#header')
        let scrollTop = $(this).scrollTop()

        if (!header) return

        // down the page
        if (scrollTop < 40){
            header.removeClass("nav-fixed")
        } 
        // in the header
        else {
            header.addClass("nav-fixed")
        }
    }
    setNav();
    window.onscroll = setNav

});

