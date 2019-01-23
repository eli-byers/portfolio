$(document).ready(function() {


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

    // window resize
    $(window).resize(function() {
        setHeroHeight()
    });
});

