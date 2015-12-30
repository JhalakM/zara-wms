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
	
	$(".dynamic-call").click(function(){
		$('.form-content').dynamicForm({
			//var ajaxURL = SET_WEB_URL+"file/form_configuration.json";
			//ajaxCallBack(ajaxURL,generateFormSuccess,generateFormError);
		});
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
			LOADER_MESSAGE = "<h4>"+$.i18n.prop('loading_message')+"</h4>";

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
	alert(json_data);
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
			$.blockUI({ overlayCSS: { backgroundColor: '#00f' },message: LOADER_MESSAGE }  ); 
		}
	});
}

/* function to unblock block UI element */
function unblockUI(){
	setTimeout($.unblockUI, 5000); 
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

/* function to generate date picker */
function datepicker() 
{
	$( "#datepicker" ).datepicker({
	  changeMonth: true,
	  changeYear: true,
	  dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
	});
}
