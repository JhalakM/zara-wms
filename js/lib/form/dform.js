/*
|@author : Intech Creative Services
|@desc   : Plugin to generate dynamic form.
|@param  : -
*/

$.fn.dynamicForm = function(options){
	var self = $(this);

	var defaults = $.extend({
		ajaxUrl : false,
		datatype:'json',
		method : 'POST',
		columns: [],
	},options);
	//var addTypes = {};
	var methods = {
		init : function(){
			alert(defaults.columns);
		}
	};
	return methods.init();
};
