define([], function(){

	function ObjectTypeException(message){
		this.name = 'ObjectTypeException';
		this.message = message || 'Non-valid object type';
	}

	ObjectTypeException.prototype = new Error();
	ObjectTypeException.prototype.constructor = ObjectTypeException;

	function Exception(message){
		this.name = 'Exception';
		this.message =  message || 'Unknown Exception';
	}

	Exception.prototype = new Error();
	Exception.prototype.constructor = Exception;

	return{
		ObjectTypeException: ObjectTypeException,
		Exception: Exception
	}
});