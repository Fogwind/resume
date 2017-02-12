/*$(document).on("mousewheel DOMMouseScroll",function(event) {
     	//that.animate({top:"-300px"},"slow");
     	//alert(12);
     	event = event || window.event;
     	var delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));              // firefox

    
    if (delta > 0) {
        // 向上滚
        console.log("wheelup");
    } else if (delta < 0) {
        // 向下滚
        console.log("wheeldown");
    }
    console.log(event);
    console.log(event.originalEvent);
     	
});*/
$('.fullpage-container').fullpage({});
//$('.personal-works-thumbnail').each()
$('.personal-works-thumbnail').on('mouseenter',function() {
	$(this).find('.personal-works-describe').animate({bottom:0},"800ms");
});
$('.personal-works-thumbnail').on('mouseleave',function() {
	$(this).find('.personal-works-describe').animate({bottom:"-100%"},"800ms");
});

