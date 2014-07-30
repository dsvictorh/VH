//Get dependencies like specific plugins and user controls (nested)
define(['js/exception'], function(exception){
	//All user controls should expect the "ko" parameter which is the Knockout script
	//args should contain the controller and action for the backend mail call and the id of the form it will enhance
	var form = function(ko, args){
		//Private access members
		var self = this;
		var ko = ko || {};

		//Public access members
		self.controller = null;
		self.action = null;
		self.form = null;
		self.timeout = null;
		self.displayTimeout = null;
		self.message = ko.observable();
		self.error = ko.observable();
		self.displayMessage = ko.observable(false);


		self.send = function(){
			var fields = {};
			var recaptcha = {
				recaptcha_challenge_field: $('#recaptcha_challenge_field').val() || '',
				recaptcha_response_field: $('#recaptcha_response_field').val() || ''
			};

			self.form.find('input[name!=recaptcha_challenge_field][name!=recaptcha_response_field], textarea').each(function(){
		    	fields[$(this).attr('name')] = {name: $('label[for=' + $(this).attr('id') + ']').text(), value: $(this).val()};
		    });


			$.ajax({
				url: '/php/handle.php',
				type: 'POST',
				dataType: 'json',
				data: {
					controller: self.controller,
					action: self.action,
					fields: fields,
					recaptcha: recaptcha
					}
			}).done(function(data){
				self.message(data.message);
				self.error(data.error);

				if(!self.error()){
					self.form.find('input[name!=recaptcha_challenge_field][name!=recaptcha_response_field], textarea').each(function(){
				    	$(this).val('');
				    });
				}
			}).fail(function(xhr, textStatus, errorThrown) {
				console.error("Handle error: " + exception.formatNoHtml(xhr.responseText));
				self.message("An Error has Occurred");
				self.error("ex");
			}).always(function(data){
				self.displayMessage(true);

				if(self.timeout){
					clearTimeout(self.timeout);
					self.timeout = null;
				}

				self.timeout = setTimeout(function(){
					self.displayMessage(false);
					self.error('');
				}, 1000);

				if(self.displayTimeout){
					clearTimeout(self.displayTimeout);
					self.displayTimeout = null;
				}

				self.displayTimeout = setTimeout(function(){
					self.message('');
				}, 2000)

				if(Recaptcha)
					Recaptcha.reload();
			});
		}
		

		//Initialize the object
		self.init(args);
	};

	//All user controls should always have an init function to initialize the needed values
	form.prototype.init = function(args){
		var self = this;

		try{
			if(!args.controller || !args.action || !args.form)
				throw new exception.Exception('user control controller, action and/or form not defined');

			self.controller = args.controller;
			self.action = args.action;
			;

			if(!(self.form = $('#' + args.form)).is('form'))
				throw new exception.Exception('#' + args.form + ' is not a valid form element');
			
		}catch(error){
			console.error("Form user control error: " + exception.formatNoHtml(error.message));
		}
	}

	//Public access API
	return{
		//Create function to instantiate this user control
		createControl: function(ko, args){ return new form(ko, args); }
	}
	
});