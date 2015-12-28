/*!
* Custom functions to set data as per window resize/hide and show content on click
*/
$(window).load(function(){
	
	/* Scrollbar */
	$(".scroll").mCustomScrollbar({
		axis:"yx",
		scrollButtons:{enable:true},
		theme:"3d",
		scrollbarPosition:"inside"
	});			
});

$(document).ready(function() {
	
	/* Custom Select Box */
	//$('.select-dropdown').fancySelect();
	var menu = $('#top').find('menu');

	function positionMenuArrow() {
		var current = menu.find('.current');

		menu.find('.arrow').css('left', current.offset().left + (current.outerWidth() / 2));
	}

	$(window).on('resize', positionMenuArrow);

	menu.on('click', 'a', function(e) {
		var el = $(this),
			href = el.attr('href'),
			currentSection = $('#main').find('.current');

		e.preventDefault();

		menu.find('.current').removeClass('current');

		el.addClass('current');

		positionMenuArrow();

		if (currentSection.length) {
			currentSection.fadeOut(300).promise().done(function() {
				$(href).addClass('current').fadeIn(300);
			});
		} else {
			$(href).addClass('current').fadeIn(300);
		}
	});

	menu.find('a:first').trigger('click')
	
	/* Switch */
	$(".toggle-switch a").each(function(){
		$(this).click(function(){
			$(this).parents(".toggle-switch").children("li").removeClass("switch");
			$(this).parents("li").addClass("switch"); 
		});
	});
	
	
	custom_dropdown_list();
});

function custom_dropdown_list()
{
	$('.dropdownlist .selected-listitem').click(function(){
		var this_ul = $(this).parent().find('ul');
		$('.dropdownlist ul').not(this_ul).hide();
		this_ul.toggle();
	});
	$('.dropdownlist ul li').click(function(){
		var selectbox_val  = $(this).attr('rel');
		var selectbox_text = $(this).text();
		alert(selectbox_val);
		$(this).parents('.dropdownlist').find('.selected-listitem').text(selectbox_text);
		$(this).parents('.dropdownlist').find('.dropdown-item').attr('value',selectbox_val);
		$('.dropdownlist ul').hide();
	});
	
}