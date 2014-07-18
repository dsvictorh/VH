//Get dependencies like specific plugins and user controls (nested)
define([], function(){
	//All user controls should expect the "ko" parameter which is the Knockout script
	var floatingBox = function(ko){
		//Private access members needed around the object
		var self = this;

		//Initialize the object
		self.init();
	};

	//All user controls should always have an init function to initialize the needed values
	floatingBox.prototype.init = function(){

	}

	//Public access functions for this user control
	return{
		//Create function to instantiate this user control
		createControl: function(ko){ return new floatingBox(ko); }
	}
});