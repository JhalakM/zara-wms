/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	custom_dropdown_list();
	//effectToggleSwitch();
	datePicker("#datepicker");
	accordionPanel();
	generateSVG();
	sidebarHeight();
	dateTimePicker();
	validateDetails();
});

$(window).load(function(){
	getFormElement();
});
