$(document).ready(function() {

    // $('.game-pic').hover(function(e){
    //     let src = $(this).attr('src')
    //     let alt_src = $(this).data('alt-src')
    //     $(this).attr('src', alt_src)
    //     $(this).data('alt-src', src)
    //     console.log(index);
    // })

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

