/*
This application is encapsuled through this script. All dependencies are loaded from this point and those 
accessible objects and methods are provided in the API returned.

Since jQuery and any function that gets created inside of it is not really accessible through an object param 
all jquery plugins need to be defined as noparam and they will return undefined values and therefore are not 
usable through the param, instead they can be used just like they usually are (jQuery or $).

In order to successfully follow the architecture all view models should recieve the utils object returned by 
this function. In the same way all user controls should recieve the Knockout object. For reference check the
home.js view model and the floating-box.js user control.

This script also counts as the initialization script for the basic and global layout of the page (e.g.: the navigation links). Any custom 
event should perfectly fit inside a viewModel or user control and should be bound through Knockout.
*/

//Config require without loading timeout
require.config({
	waitSeconds: 0
});

define(['js/lib/ko','js/lib/scroll-to'], function (ko, noparam) {
	//Site Init
	/*
	This functionality points to the body because it won't limit the scroll navigation links throughout
	the page to the main navigation. In other words whatever button, link or other you want to trigger a scroll
	somewhere in the page just needs the data-scroll attribute and the target as the value.
	*/
	$('body').on('click', '[data-scroll!=""]', function(){
		$.scrollTo($(this).attr('data-scroll'), 800, { offset: -$('#site-nav').outerHeight() })
	});

	//Move fixed elements with scroll in small screens
	$(window).scroll(function () {
	    $("#site-nav nav, #toggle-box").css({
	        left: '-' + $(this).scrollLeft() + 'px'
	    });
	});

	//Prevent KO events bubbling
	ko.bindingHandlers.preventBubble = {
	    init: function(element, value) {
	        var eventName = ko.utils.unwrapObservable(value());
	        ko.utils.registerEventHandler(element, eventName, function(event) {
	           event.cancelBubble = true;
	           if (event.stopPropagation) {
	                event.stopPropagation();
	           }                
	        });
	    }        
	};

	ko.bindingHandlers.fadeVisible = {
	    update: function(element, value) {
	        var isVisible = ko.utils.unwrapObservable(value());
	        
			if(isVisible){
				$(element).fadeIn(400);
			}else{
				$(element).fadeOut(400);
			}
	    }        
	};

	//Public access API
    return {
    	ko: ko
    };
});