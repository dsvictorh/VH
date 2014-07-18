//Get dependencies like specific plugins and user controls
define(['js/user-controls/floating-box.js'], function(floatingBox){
	//viewModel should expect the "app" parameter which is the utils script which contains all dependencies
	var viewModel = function(app){
		//Private access members needed around the object
		var self = this;
		var ko = app.ko;

		self.floatingBoxes = ko.observableArray([]);

		//Initialize the object
		self.init();
	};

	//viewModel should always have an init function to initialize the needed values
	viewModel.prototype.init = function(){
		//The Knockout object is needed as a private member of viewModel to pass to the user controls we include in it
		this.floatingBoxes([floatingBox.createControl(this.ko)]);
	}

	//Public access functions for this viewModel
	return{
		//Create function to instantiate this viewModel
		createView: function(app){ return new viewModel(app); }
	}
});