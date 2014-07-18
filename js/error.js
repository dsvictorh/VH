define([], function(){
	function validateField(field){
		return true;
	}

	return{
		validateField: function(field){ return validateField(field); }
	}
});