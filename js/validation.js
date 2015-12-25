/*
|@author : Intech Creative Services
|@desc   : pliugin for custom validations.
|@param  : 
*/

(function ($) {
	
	$.fn.validate = function(options){
		var self = $(this);
		var message;
		var methods = {
			createErrorElement = function(input,message){
				var error_div = document.createElement("div");
				$(error_div).addClass("input-error");
				
			}
		},
	};
})(jQuery); 