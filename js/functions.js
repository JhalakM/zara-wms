/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
|@param  : ajax_url - API URL to call api
		   success_callback - when api execute successfully
		   failure_callback - when api execute with error
		   params - parameter keys and values
*/


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