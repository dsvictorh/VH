//Get dependencies like specific plugins and user controls
define(['js/user-controls/floating-box.js'], function(floatingBox){
	//viewModel should expect the "app" parameter which is the utils script which contains all dependencies
	var viewModel = function(app){
		//Private access members needed around the object
		var self = this;
		var ko = app.ko;
		self.floatingBox = ko.observable();
		self.year = ko.observable();

		//Initialize the object
		self.init(ko);
	};

	//viewModel should always have an init function to initialize the needed values
	viewModel.prototype.init = function(ko){
		this.floatingBox([floatingBox.createControl(ko)]);
		this.year(new Date().getFullYear());
	}

	//Public access functions for this viewModel
	return{
		//Create function to instantiate this viewModel
		createView: function(app){ return new viewModel(app); }
	}
});