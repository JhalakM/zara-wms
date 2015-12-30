/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	
	loadCSS(['lib/scrollbar/jquery.mCustomScrollbar.css']);
	languagePlugin(current_lang);
});



$(window).load(function(){
	generateScrollbar();
});
