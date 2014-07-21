//Get dependencies like specific plugins and user controls
define(['js/user-controls/toggle-box.js'], function(toggleBox){
	//viewModel should expect the "app" parameter which is the utils script which contains all dependencies
	var viewModel = function(app){
		//Private access members
		var self = this;
		var ko = app.ko;

		//Public access members
		self.toggleBox = ko.observable();
		self.year = ko.observable();

		//Initialize the object
		self.init(ko);
	};

	//viewModel should always have an init function to initialize the needed values
	viewModel.prototype.init = function(ko){
		//User controls are defined as any a property of viewModel to keep encapsulation and the architecture consistant
		this.toggleBox(toggleBox.createControl(ko));
		this.year(new Date().getFullYear());
	}

	//Public access API
	return{
		//Create function to instantiate this viewModel
		createView: function(app){ return new viewModel(app); }
	}
});