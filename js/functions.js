/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
*/


/* constant for set baseurl path */
const SET_WEB_URL = "https://localhost/zara-wms/";
//const SET_WEB_URL = "./";

/* constant for set loader message */
const LOADER_MESSAGE = "<h4> Please wait...</h4>";

var current_lang = "en-us";

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
    document.getElementsByTagName("head")[0].appendChild(script);
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
function generateScrollbar(){
	$(".scroll").mCustomScrollbar({
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