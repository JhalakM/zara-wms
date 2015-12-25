/*
|@author : Intech Creative Services
|@desc   : function need to use on init level.
|@param  : SET_WEB_URL - define baseurl path
		   LOADER_MESSAGE - default loader message
		   current_lang - language selected default
*/

/* constant for set baseurl path */
const SET_WEB_URL = "./";

/* constant for set loader message */
const LOADER_MESSAGE = "<h4> Please wait...</h4>";

var current_lang = "en";

$(document).ready(function(){
	languagePlugin(current_lang);
});



/* call plugin for i18n language tanslation library */
function languagePlugin(lang){

	jQuery.i18n.properties({
		name:'Messages', 
		path:'../../bundle/', 
		mode:'both',
		language:lang, 
		callback: function() {
			// We specified mode: 'both' so translated values will be
			// available as JS vars/functions and as a map

			// Accessing a simple value through the map
			jQuery.i18n.prop('msg_hello');
			// Accessing a value with placeholders through the map
			jQuery.i18n.prop('msg_complex', 'John');

			// Accessing a simple value through a JS variable
			alert(msg_hello +' '+ msg_world);
			// Accessing a value with placeholders through a JS function
			alert(msg_complex('John'));
		}
	});	
	
}


