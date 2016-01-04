/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	languagePlugin(current_lang);
});



$(window).load(function(){
	generateBlockUI();
	unblockUI();
	generateDynamicElements();
});
