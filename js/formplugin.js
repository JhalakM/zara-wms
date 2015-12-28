/*
|@author : Intech Creative Services
|@desc   : Plugin to generate dynamic form.
|@param  : -
*/

(function ($) {

	$.fn.dataGrid = function(options){
		var self = $(this);

		var defaults = $.extend({
			
		},options);
		var addTypes = {};
		var methods = {
			init : function(){
				alert("aa");
			}
		};
		return methods.init();
	};
})(jQuery);