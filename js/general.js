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
	var getElement = "";
	var element;
	var formWrapper;
	
	for(var fe = 0; fe < formElement.length; fe++){
		
		switch(formElement[fe].type) {
			case "text":
				element = $(ele_input).attr({
					"class" : "text-box",
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
					"type"    : formElement[fe].type
				});
				break;
			case "textarea":
				element = $(ele_textarea).attr({
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
					"type"    : formElement[fe].type
				});	
				break;
			case "dropdown":
				var input = $(ele_dropdown).find("input");
				element = $(input).attr({
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
				});
				
				break;				
			case "radio":
				element =  $(ele_input).attr({
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
					"type"    : formElement[fe].type
				});		
				break;				
			case "checkbox":
				element =  $(ele_input).attr({
					"class" : "css-checkbox",
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
					"type"    : formElement[fe].type
				});		
				break;
			case "file":
				element = $(ele_input).attr({
					"name"    : formElement[fe].name,
					"tabindex": formElement[fe].tabindex,
					"type"    : formElement[fe].type
				});		
				break;
				
		}
		var html = returnObject(element);
		getElement += html;
	}
	return getElement;
	
}

function returnObject(obj){
	return $('<div>').append(obj.clone()).html();
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