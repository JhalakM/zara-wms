/*!
* Custom functions to set data as per window resize/hide and show content on click
*/
$(window).load(function(){
	
	// Scrollbar JavaScript
	$(".scroll").mCustomScrollbar({
		axis:"yx",
		scrollButtons:{enable:true},
		theme:"3d",
		scrollbarPosition:"inside"
	});			
});

$(document).ready(function() {
	
	// Switch JavaScript
	$(".toggle-switch a").each(function(){
		$(this).click(function(){
			$(this).parents(".toggle-switch").children("li").removeClass("switch");
			$(this).parents("li").addClass("switch"); 
		});
	});
	
	// Custom dropdown JavaScript
	custom_dropdown_list();
});

// function to generate custom dropdown
function custom_dropdown_list()
{
 $('.dropdown-list .selected-listitem').click(function(){
  var this_ul = $(this).parent().find('ul');
  $('.dropdown-list ul').not(this_ul).hide();
  this_ul.toggle();
  
  //alert(this_ul.height());
  if(this_ul.find('li').length >= 4)
  {
   this_ul.css({height:this_ul.height()});
   // Scrollbar JavaScript
   this_ul.mCustomScrollbar({
    axis:"yx",
    scrollButtons:{enable:true},
    theme:"3d",
    scrollbarPosition:"inside"
   });  
  } 
 });
 $('.dropdown-list ul li').click(function(){
  var selectbox_val  = $(this).attr('rel');
  var selectbox_text = $(this).text();
  $(this).parents('.dropdown-list').find('.selected-listitem').text(selectbox_text);
  $(this).parents('.dropdown-list').find('.dropdown-item').attr('value',selectbox_val);
  $('.dropdown-list ul').hide();
 });
 
}
// function to Display Show None

	function toggle_visibility(className) {
      var className = $("."+className);
       if($(className).css('display') == 'block')
		$(className).css('display','none');
	  else
		$(className).css('display','block');
    }