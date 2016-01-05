/*
|@author : Intech Creative Services
|@desc   : Plugin to generate dynamic form.
|@param  : -
*/

$.fn.dynamicForm = function(options){
	var self = $(this);
	var caption;
	var formTag;
	var formCreate;
	var formElement;
	var formButtons;
	var defaults = $.extend({
		ajaxUrl : false,
		datatype:'json',
		method : 'POST',
		formObject: [],
	},options);
	var methods = {
		generateForm : function(formData){
			var formString = jsonStringify(formData);
			formCreate  = document.createElement("form");
			$(self).append(formCreate);
			$.each(formData, function(key, value) {
				
				formTag 	= jsonParse(jsonStringify(formData[key].formTag));

				$(formCreate).attr({
					"name" 	 : formTag.name,
					"id"	 : formTag.name,
					"method" : formTag.method,
					"action" : formTag.action,
				});
				formElement 	= jsonParse(jsonStringify(formData[key].formElements));
				$(formCreate).append(generateElements(formElement,formTag.name));
				formCaption = generateCaption(formTag.name,formData[key].caption);
			});
			
		},
		init : function(){
			loadScript(SET_WEB_URL+"template/elements.js", function(){
					methods.generateForm(defaults.formObject);
					
			});
		}
	};
	return methods.init();
};
