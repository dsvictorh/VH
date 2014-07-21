//A set of custom errors to fit to your needs
define([], function(){
	function ObjectTypeException(message){
		this.name = 'ObjectTypeException';
		this.message = message || 'Non-valid object type';
	}

	/*
	Since the custom errors pretend to inherit from the javascript Error class it is important
	to include at least the name and message properties so the error format doesn't get screwed up
	*/
	ObjectTypeException.prototype = new Error();
	ObjectTypeException.prototype.constructor = ObjectTypeException;

	function Exception(message){
		this.name = 'Exception';
		this.message =  message || 'Unknown Exception';
	}

	Exception.prototype = new Error();
	Exception.prototype.constructor = Exception;

	function formatNoHtml(message){
		return message.replace(/(<([^>]+)>)/ig,'').replace(/\n/ig, ' ').trim();
	}

	//Public access API
	return{
		ObjectTypeException: ObjectTypeException,
		Exception: Exception,
		formatNoHtml: formatNoHtml
	}
});