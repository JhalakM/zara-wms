/*
|@author : Intech Creative Services
|@desc   : pliugin for custom validations.
|@param  : 
*/



$.fn.validate = function(options){
	var self = $(this);
	var value;
	var divClone = document.createElement("div");
	var methods = {
		
		createElement : function(thisValue,allRules){
			var inputElement  = $(thisValue).attr("name");
			$(divClone).addClass("error-message");
			methods.checkRules(inputElement,allRules);
		},
		checkRules : function(element,rules){
			var ruleName = rules;
			$(self).find(".error-message").remove();
			/*switch(ruleName){
				case "required":
					_required(element);
					break;
				case "email":
					_email(element);
					break;
			}*/
			
			function _required(element){
				value = $("[name = '"+element+"']").val();
					if(value == ""){
						$(divClone).append("This field is required");
						$(self).find("[name = '"+element+"']").parent(selector_p_r_5).append(divClone);
					}
			};
			function _email(element){
				value = $("[name = '"+element+"']").val();
				var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(regEx.test(value) == false){
					$(divClone).append("Invalid Email Address");
					$(self).find("[name = '"+element+"']").parent(selector_p_r_5).append(divClone);
				}
			};
			
		},
		init : function(){
			$(self).find("[data-validate]").each(function(){
				$(this).on("focus",function(){
					var dataValid = $(this).data("validate").split(",");
					var thisValue = $(this);
					for(var i=0; i<dataValid.length; i++){
						methods.checkRules(thisValue,dataValid[i]);
					}
				});
			});
		}
	};
	return methods.init();
};
