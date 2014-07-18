/*
This application is encapsuled through this script. All dependencies are loaded from this point and those 
accessible objects and methods are provided in the API returned.

Since jQuery and any function that gets created inside of it is not really accessible through an object param 
all jquery plugins need to be defined as jqnoparam and they will return undefined values and therefore are not 
usable through the param, instead they can be used just like they usually are (jQuery or $).

In order to successfully follow the architecture all view models should recieve the utils object returned by 
this function. In the same way all user controls should recieve the Knockout object. For reference check the
home.js view model and the floating-box.js user control.

This script also counts as the initialization script for the basic and global layout of the page (e.g.: the navigation links). Any custom 
event should perfectly fit inside a viewModel or user control and should be bound through Knockout.
*/
define(['js/lib/ko','js/lib/scroll-to', 'js/error'], function (ko, jqnoparam, error) {
	/*
	This functionality points to the body because it won't limit the scroll navigation links throughout
	the page to the main navigation. In other words whatever button, link or other you want to trigger a scroll
	somewhere in the page just needs the data-scroll attribute and the target as the value.
	*/
	$('body').on('click', '[data-scroll!=""]', function(){
		$.scrollTo($(this).attr('data-scroll'), 800, { offset: -$('#site-nav').outerHeight() })
	});

	//Move fixed nav with scroll in small screens
	$(window).scroll(function () {
	    $("#site-nav nav").css({
	        left: '-' + $(this).scrollLeft() + 'px'
	    });
	});

    return {
    	ko: ko
    };
});