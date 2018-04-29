$(window).on('load', function() {
    
    loadIframes();
    loadImages();
    
    function loadImages(){
        $('#anglehack').attr('src', 'static/images/projects/angelhack.jpg')
        $('#campuscoatcheck').attr('src', 'static/images/projects/campuscoatcheck.png')
        $('#fmrf').attr('src', 'static/images/projects/mcmurray.png')
        $('#nearby').attr('src', 'static/images/projects/nearby.png')
        $('#profile').attr('src', 'static/images/avatar.png')
    }

    function loadIframes() {
        var vidDefer = document.getElementsByTagName('iframe');
        for (var i=0; i<vidDefer.length; i++) {
            if(vidDefer[i].getAttribute('data-src')) {
                vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
            } 
        }
    }
});