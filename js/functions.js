/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/


/* constant for set baseurl path */
const SET_WEB_URL = "http://localhost/zara-wms/";
//const SET_WEB_URL = "./";

var current_lang = "en-us";

var current_theme = "blue";
var current_theme_css = SET_WEB_URL+"assets/"+current_theme+"/style.css";

var LOADER_MESSAGE = "";

function resourceBundle(){
	return SET_WEB_URL+'bundle/'+current_lang+'/';
}

/* function to start block ui for loader */
function ajaxloaderStart()
{
	$.blockUI({ message: LOADER_MESSAGE });
	$(document).ajaxStart($.blockUI);
}

/* function to stop block ui loader */
function ajaxLoaderStop()
{
	$(document).ajaxStop($.unblockUI());
}

/* function to get ajax response */
function ajaxCallBack(ajax_url,success_callback,failure_callback,params)
{
	ajaxloaderStart();
	$.ajax({
   			url: ajax_url,
            dataType: "json",
		    type: "POST",
			data:params,
			cache:false,
		    crossDomain: true,
	   error: function(data,status,error) {
		  ajaxLoaderStop();
		  failure_callback(error);
	   },
	   success: function(data) {
	   	 ajaxLoaderStop();
	   	 success_callback(data);
	   }
	});
}

/* function to get form element from dynamic form plugin */
function getFormElement(){
	
	$(".call-formbtn").click(function(){
		var ajaxUrl = SET_WEB_URL+"file/form_configuration.json";
		ajaxCallBack(ajaxUrl,generateFormSuccess,generateFormError);
	});
	
}

/* call plugin for i18n language tanslation library */
function languagePlugin(lang){
	
	$.i18n.properties({
		name:['constant','messages'], 
		path: resourceBundle(), 
		mode:'both',
		language:lang, 
		callback: function() {
			// We specified mode: 'both' so translated values will be
			// available as JS vars/functions and as a map
			
			/* variable for set loader message */
			LOADER_MESSAGE = "<div class='white large'><div class='ispinner white large animating'>"+
							  "<div class='ispinner-blade'></div><div class='ispinner-blade'></div>"+
							  "<div class='ispinner-blade'></div><div class='ispinner-blade'></div>"+
							  "<div class='ispinner-blade'></div><div class='ispinner-blade'></div>"+
							  "<div class='ispinner-blade'></div><div class='ispinner-blade'></div>"+
							  "</div></div>"+
							  "<h4></h4>";

			getTemplateParams();
		}
	});
	
	
}
/* function to call xustom exception */
function customException(){
	try {
		// attempt to execute this code
	} catch (exception) {
		// this code handles exceptions
	} finally {
		// this code always gets executed
	}
}

/* function to call dynamic form plugin for success */
function generateFormSuccess(json_data){
	var jsonString = JSON.stringify(json_data);
	var obj = jQuery.parseJSON(jsonString);
	if (obj.errorCode == 0) {
		$('.form-content').dynamicForm({
			formObject : obj.returnObject
		});
	}
	
}

/* function to call dynamic form plugin for error */
function generateFormError(json_data){
	alert(json_data);
}

/* function to call generate scrollbar */
function generateScrollbar(selector){
	var scroll_selector = "";
	if(selector == undefined)
		scroll_selector = "[data-scroll]";
	else
		scroll_selector = selector;
	$(scroll_selector).mCustomScrollbar({
		axis:"yx",
		scrollButtons:{enable:true},
		theme:"3d",
		scrollbarPosition:"inside"
	});		
}

/* function to generate custom dropdown */
function custom_dropdown_list()
{
	$('.dropdown-list .selected-listitem').click(function(){
		  var this_ul = $(this).parent().find('ul');
		  $('.dropdown-list ul').not(this_ul).hide();
		  this_ul.toggle();

		if(this_ul.find('li').length >= 4)
		{
			this_ul.css({height:this_ul.height()});
			
		   // Scrollbar JavaScript
		   generateScrollbar(this_ul);
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

/* function to generate effects of toggle switch */
function effectToggleSwitch(){
	
	$(".toggle-switch a").each(function(){
		$(this).click(function(){
			$(this).parents(".toggle-switch").children("li").removeClass("switch");
			$(this).parents("li").addClass("switch"); 
		});
	});
}

/* function to replace template keys with value */
function getTemplateParams(){

	$('[data-replace]').each(function(){
	  // Find the pattern.
	  var element = $(this);
	  var replaceWith = $(this).data("replace");
	  switch(replaceWith) {
		case "meta":
			element.attr("content",element.attr("content").replace(/{{(.*)}}/g,function(match, contents, offset, s)
			{
				return $.i18n.prop(contents);
			}));
			break;
		default:
			element.text(element.text().replace(/{{(.*)}}/g,function(match, contents, offset, s)
			{
				return $.i18n.prop(contents);
			}));
		}
	});
}

/* function to load css dynamically */
function loadCSS(css_array){
	var css = "";
	for(i=0;i<css_array.length;i++){
		css += ' <link href="css/'+css_array[i]+'" rel="stylesheet">';
	}
	
	css += '<link href="'+current_theme_css+'" rel="stylesheet">';
	
	$('head').append(css);
}

/* function to  Display Show None  css dynamically */
function toggle_visibility(className) {
  var className = $("."+className);
   if($(className).css('display') == 'block')
	$(className).css('display','none');
  else
	$(className).css('display','block');
}

/* function to generate block UI element */
function generateBlockUI(){

	$('[data-reference]').each(function(){

	  var element = $(this);
	  var getReference = $(this).data("reference");
	  switch(getReference) {
		case "filter-loader":
			
			break;
		default:
			$.blockUI({ overlayCSS: { backgroundColor: '#000' },message: LOADER_MESSAGE }  ); 
		}
	});
}

/* function to unblock block UI element */
function unblockUI(){
	setTimeout($.unblockUI, 1000); 
}

/* function to load javascript file in run time */
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
}

/* function to cerate captcha code */
function createCaptcha(formId){
	 $("#"+formId).captchaWord(); 
}

/* function to set accordion panel effects */
function accordionPanel(){
	$(".accordion .accordion-content:not(:first)").hide();
	$(".accordion .accordion-panel").each(function(){
		$(this).children(".accordion-header").click(function(){
			if($(this).parents(".accordion-panel").hasClass("active")){
				$(this).parents(".accordion-panel").addClass("accordion-close");
				$(this).parents(".accordion-panel").removeClass("active");
				$(this).siblings(".accordion-content").slideUp();
			}else{
				$(".accordion-content").slideUp();
				$(".accordion-panel").removeClass("active");
				$(".accordion-panel").addClass("accordion-close");
				$(this).parents(".accordion-panel").removeClass("accordion-close");
				$(this).parents(".accordion-panel").addClass("active");
				$(this).siblings(".accordion-content").slideDown();
			}
		});
	});
}

/* function to generate svg files */

function generateSVG(){
	$('[data-svg]').each(function(){
	  // Find the pattern.
	  var element = $(this);
	  var replaceWith = $(this).data("svg");
	  switch(replaceWith) {
		case "svg-filter":
				var svg_html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" ' +
					'" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">'+
					'<g>'+
						'<polygon class="filter-icon" points="1.1,5.9 24.3,29.1 24.3,60 39.7,52.3 39.7,29.1 62.9,5.9"/>'+
					'</g>'+
				'</svg>';
				$(this).html(svg_html);
			break;
			case "svg-calendar":
				var svg_html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" ' +
					'" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">'+
					'<g>'+
						'<polygon class="filter-icon" points="1.1,5.9 24.3,29.1 24.3,60 39.7,52.3 39.7,29.1 62.9,5.9"/>'+
					'</g>'+
				'</svg>';
				$(this).html(svg_html);
			break;
		default:
			
		}
	});
}

/* function to generate date picker */
function datepicker() 
{
	$( "#datepicker" ).datepicker({
	  changeMonth: true,
	  changeYear: true,
	  dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
	});
}

function sidebarScroll()
{
	 var sticky = $('.sidebar'),
      scroll = $(window).scrollTop();

  if (scroll >= 107) sticky.addClass('sticky');
  else sticky.removeClass('sticky');
  
}

function actionBlock()
{
	$( ".grid-action-group a" ).click(function(){
    $( ".grid-action-form" ).slideToggle( "slow" );
});
}

function appActionBlock()
{
	$( ".app-action-group a" ).click(function(){
    $( ".app-action-form " ).slideToggle( "slow" );
});
}


//dp-menu action
function linkDropdown()
{
				$(".user-profile").click(function(){
				 if($(".user-profile-menu").css('display')=="none"){
					$(".user-profile-menu").show();
				 }else{
					$(".user-profile-menu").hide();
				 }
				});}


function generateDynamicElements(){
	loadScript(SET_WEB_URL+"template/elements.js", function(){
		$(".call-formbtn").html(btn_normal);
	});
}

