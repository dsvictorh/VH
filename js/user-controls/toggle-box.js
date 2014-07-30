//Get dependencies like specific plugins and user controls (nested)
define(['js/exception'], function(exception){
	//All user controls should expect the "ko" parameter which is the Knockout script
	var toggleBox = function(ko){
		//Private access members
		var self = this;
		var ko = ko || {};

		//Public access members
		self.project = ko.observable();
		self.text = ko.observable();
		self.image = ko.observable();
		self.url = ko.observable();
		self.urlText = ko.observable();
		self.urlPre = ko.observable();
		self.urlPost = ko.observable();
		self.boxes = ko.observableArray([]);
		self.errorPages = ko.observableArray([]);


		self.hasDescription = ko.computed(function(){
			return self.text() || self.url();
		});

		self.setBox = function(item){
			try{
				if(!(item instanceof box))
					throw new exception.ObjectTypeException('Event object must be of type box');

				self.project(item.getProject());
				self.text(item.getText());
				self.image(item.getImage());
				self.url(item.getUrl());
				self.urlText(item.getUrlText());
				self.urlPre(item.getUrlPre());
				self.urlPost(item.getUrlPost());

			}catch(ex){
				console.error(ex.message);
			}			
		}

		self.clearBox = function(){
			self.project('');
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
			var errorPages = []
			for(i = 0; i < data.length; i++){
				if(parseInt(data[i].is_error_page)){
					errorPages.push(new box(data[i]));
				}else{
					boxes.push(new box(data[i]));
				}

			}

			self.boxes(boxes);
			self.errorPages(errorPages);

		}).fail(function(xhr, textStatus, errorThrown) {
			console.error("Handle error: " + exception.formatNoHtml(xhr.responseText));
		});
	}

	//box data model
	var box = function(args){
		//Private access members
		var self = this;
		var project = args.project || '';
		var text = args.description || '';
		var image = args.img_url || '';
		var url = args.external_link || '';
		var urlText = args.external_link_text || '';
		var urlPre = args.external_link_pre || '';
		var urlPost = args.external_link_post || '';

		//Public access members
		self.getProject = function(){
			return project;
		}

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