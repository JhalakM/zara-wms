/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	loadCSS(['lib/bootstrap/bootstrap.min.css','lib/font/font-awesome.min.css','style.css','reset.css','responsive.css','lib/scrollbar/jquery.mCustomScrollbar.css','lib/jquery-ui/jquery-ui.css']);
	custom_dropdown_list();
	effectToggleSwitch();
	datepicker();
	accordionPanel();
	generateSVG();
	
});




$(window).load(function(){
	getFormElement();
});
