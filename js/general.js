/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/


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


function jsonStringify(jStringData){
	return  JSON.stringify(jStringData);
}

function jsonParse(jParseData){
	return  jQuery.parseJSON(jParseData);
}

function generateElements(formElement){
	var getElementData;
	var formWrapper;
	for(var fe = 0; fe < formElement.length; fe++){
		var element = document.createElement("input");
		var labelElement = document.createElement("label");
		
		$(labelElement).text($.i18n.prop(formElement[fe].labelkey));
		$(element).attr({
			"name" : formElement[fe].name,
		});
		switch(formElement[fe].type) {
			case "text":
				
				break;
			case "textarea":
					
				break;
			case "dropdown":
					
				break;				
			case "radio":
					
				break;				
			case "checkbox":
					
				break;
			case "file":
					
				break;
				
		}
		getElementData = element;
	}
	return getElementData;
	
}


function generateButtons(btn_type){
	switch(btn_type) {
		case "submit":
				
			break;
		case "reset":
				
			break;				
		case "cancel":
				
			break;				
	}
}