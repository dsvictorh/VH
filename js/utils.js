/*
This application is encapsuled through this script. All dependencies are loaded from this point and those 
accessible objects and methods are provided in the API returned.

Since jQuery and any function that gets created inside of it is not really accessible through an object param 
all jquery plugins need to be defined as jqnoparam and they will return undefined values therefore are not 
usable through the param, instead they can be used just like they usually are (jQuery or $).

In order to successfully follow the architecture all view models should recieve the utils object returned by 
this function. In the same way all user controls should recieve the Knockout object. For reference check the
home.js view model and the floating-box.js user control.
*/
define(['js/lib/ko','js/lib/scroll-to',], function (ko, jqnoparam) {
	$('body').on('click', '[data-scroll!=""]', function(){
		$.scrollTo($(this).attr('data-scroll'), 800, { offset: -$('#site-nav').outerHeight() })
	});

    return {
    	ko: ko
    };
});