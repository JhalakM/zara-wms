/*
|@author : Intech Creative Services
|@desc   : Commonly used functions to call ajax, ajax success/failure callback, exceptions etc.
|@param  : ajax_url - API URL to call api
		   success_callback - when api execute successfully
		   failure_callback - when api execute with error
		   params - parameter keys and values
*/

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
function generate_form_success(json_data){
	alert(json_data);
}

/* function to call dynamic form plugin for error */
function generate_form_error(json_data){
	alert(json_data);
}