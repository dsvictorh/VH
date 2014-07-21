//Get dependencies like specific plugins and user controls (nested)
define(['js/exception'], function(exception){
	//All user controls should expect the "ko" parameter which is the Knockout script
	var toggleBox = function(ko){
		//Private access members
		var self = this;
		var ko = ko || {};

		//Public access members
		self.text = ko.observable();
		self.image = ko.observable();
		self.url = ko.observable();
		self.urlText = ko.observable();
		self.urlPre = ko.observable();
		self.urlPost = ko.observable();
		self.boxes = ko.observableArray([]);

		//the toggle box only has visibility properties and can be styled to fit the needs of the page
		self.visible = ko.computed(function(){
			return self.text() || self.image();
		});

		self.setBox = function(item){
			try{
				if(!(item instanceof box))
					throw new exception.ObjectTypeException('Event object must be of type box');

				self.text(item.getText());
				self.image(item.getImage());
				self.url(item.getUrl());
				self.urlText(item.getUrlTest());
				self.urlPre(item.getUrlPre());
				self.urlPost(item.getUrlPost());

			}catch(ex){
				console.error(ex.message);
			}			
		}

		self.clearBox = function(){
			self.text('');
			self.image('');
			self.urlText('');
			self.urlPre('');
			self.urlPost('');
		}

		//Initialize the object
		self.init();
	};

	//All user controls should always have an init function to initialize the needed values
	toggleBox.prototype.init = function(){
		var self = this;

		$.ajax({
			url: '/php/handle.php',
			type: 'POST',
			dataType: 'json',
			data: {
				controller: 'work',
				action: 'list'
			}
		}).done(function(data){
			var boxes = [];
			for(i = 0; i < data.length; i++){
				boxes.push(new box(data[i]));
			}

			self.boxes(boxes);

		}).fail(function(xhr, textStatus, errorThrown) {
			console.error("Handle error: " + xhr.responseText);
		});
	}

	//box data model
	var box = function(args){
		//Private access members
		var self = this;
		var text = args.description || '';
		var image = args.img_url || '';
		var url = args.external_link || '';
		var urlText = args.external_link_text || '';
		var urlPre = args.external_link_pre || '';
		var urlPost = args.external_link_post || '';

		//Public access members
		self.getText = function(){
			return text;
		}

		self.getImage = function(){
			return image;
		}

		self.getUrl = function(){
			return url;
		}

		self.getUrlText = function(){
			return urlText;
		}

		self.getUrlPre = function(){
			return urlPre;
		}

		self.getUrlPost = function(){
			return urlPost;
		}
	}

	//Public access API
	return{
		//Create function to instantiate this user control
		createControl: function(ko){ return new toggleBox(ko); }
	}
	
});