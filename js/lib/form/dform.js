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
		generateElements : function(elem_type){
			 switch(elem_type) {
				case "text":
					
					break;
				case "textarea":
						
					break;
				case "dropdown":
						
					break;				
				case "radio":
						
					break;				
				case "checkbox":
						
					break;
				case "file":
						
					break;
					
			}
		},
		generateButtons : function(btn_type){
			switch(btn_type) {
				case "submit":
						
					break;
				case "reset":
						
					break;				
				case "cancel":
						
					break;				
			}
		},
		generateForm : function(formData){
			var formString = jsonStringify(formData);
			
			/*/$.each(formData, function(key, value) {
				caption = formData[key].caption;
				formTag = jsonParse(jsonStringify(formData[key].formTag));
				formCreate = document.createElement("form");
	
				$(formCreate).attr({
					"name" 	 : formTag.name,
					"id"	 : formTag.name,
					"method" : formTag.method,
					"action" : formTag.action,
				});
				formElement = jsonParse(jsonStringify(formData[key].formElements));
				for(var fe = 0; fe < formElement.length; fe++){
					var element = document.createElement("input");
					
						//alert(formElement[fe]);
					
					
					$(formCreate).append(element);
					//methods.generateElements(formElement[fe].type);
				}
			});
			$(self).append(formCreate);*/
		},
		init : function(){
			alert("aaaa");
			loadScript(SET_WEB_URL+"template/elements.js", function(){
					methods.generateForm(defaults.formObject);
					
			});
		}
	};
	return methods.init();
};
