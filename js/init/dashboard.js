/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	linkDropdown();
	sidebarHeight();
	sidebarMobile() 
	heightGrid();
});



$(window).load(function(){


});


$(window).scroll(function(){
	sidebarScroll();
});