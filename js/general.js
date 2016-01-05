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

function generateElements(formElement,formId){
	var getElement = "";
	var element = "";
	var formWrapper;
	for(var fe = 0; fe < formElement.length; fe++){
		generateFormRow(formId);
		generateLabel(formId,formElement[fe].labelkey);
		functionCallback = "generate_"+formElement[fe].type;

		switch(formElement[fe].type) {
			case "text":
				window[functionCallback](formId,formElement[fe]);
				break;
			case "textarea":
				window[functionCallback](formId,formElement[fe]);
				break;
			case "dropdown":
				window[functionCallback](formId,formElement[fe]);
				break;
			case "radio":
				window[functionCallback](formId,formElement[fe]);
				/*if(formElement[fe].switch == undefined)
					window[functionCallback](formId,formElement[fe]);
				else
					generate_switch(formId,formElement[fe]);*/
				break;
			case "checkbox":
				window[functionCallback](formId,formElement[fe]);
				break;
			case "file":
				//window[functionCallback](formId,formElement[fe]);
				break;
		}
	}
	return getElement;
	
}

function generateCaption(formId,formCaption){
	var caption = $("#"+formId).prev(form_panel_title_class).text(formCaption);
	return caption;
	
}
function generateFormRow(formId){
	var formRow = $(div_col_md_6).appendTo("#"+formId);
	return formRow; 
}

function generateLabel(formId,labelKey){
	var labelHTML = $(ele_label).appendTo("#"+formId+" .form-row:last").find("label").text($.i18n.prop(labelKey));
	return labelHTML;
}

function generate_text(formId,formElement){
	var inputHTML  =  $(ele_input).appendTo("#"+formId+" .form-row:last")
						.find("input").attr({
								"name"    : formElement.name,
								"tabindex": formElement.tabindex,
								"type"    : formElement.type
							});
	return inputHTML;
}

function generate_textarea(formId,formElement){
	var textareaHTML  =  $(ele_textarea).appendTo("#"+formId+" .form-row:last")
							.find("textarea").attr({
								"name"    : formElement.name,
								"tabindex": formElement.tabindex,
								"type"    : formElement.type
							});
	return textareaHTML;
}

function generate_dropdown(formId,formElement){
	var dropdownHTML  =  $(ele_dropdown).appendTo("#"+formId+" .form-row:last");
	var liClone;
	for(var i=0; i<formElement.defaultvalue.length; i++){
		liClone = document.createElement("li");
		$(liClone).attr({
			"value" : formElement.defaultvalue[i].key,
			"rel"	: formElement.defaultvalue[i].key
		});
		$(liClone).html(edit_icon+" "+formElement.defaultvalue[i].value);
		dropdownHTML.find("ul").append(liClone);
	}
	dropdownHTML.find("input").attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabindex,
	});
	custom_dropdown_list();
	return dropdownHTML;
}


function generate_switch(formId,formElement){
	checkHTML = $(ele_switch).appendTo("#"+formId+" .form-row:last");

	for(var i=0; i<formElement.defaultvalue.length; i++){
		$(ele_switch).find("a").attr({
			"value" : formElement.defaultvalue[i].value
		});
		$(ele_switch).find("a").attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabindex,
			"type"    : formElement.type,
			"id"	  : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultvalue[i].labelkey));
		$(labelClone).append(spanClone);
		$(labelClone).find("span").html(document.createElement("span"));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(labelClone);
	}	
}

function generate_radio(formId,formElement){
	radioHTML = $(ele_radio).appendTo("#"+formId+" .form-row:last");
	var inputClone;
	var labelClone;
	var spanClone;
	for(var i=0; i<formElement.defaultvalue.length; i++){
		inputClone = document.createElement("input");
		labelClone = document.createElement("label");
		spanClone  = document.createElement("span");
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabindex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultvalue[i].value,
			"id"	  : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultvalue[i].labelkey));
		$(labelClone).append(spanClone);
		$(labelClone).find("span").html(document.createElement("span"));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(labelClone);
	}	
}


function generate_checkbox(formId,formElement){
	checkHTML = $(ele_checkbox).appendTo("#"+formId+" .form-row:last");
	var inputClone;
	var labelClone;
	var spanClone;
	for(var i=0; i<formElement.defaultvalue.length; i++){
		inputClone = document.createElement("input");
		labelClone = document.createElement("label");
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabindex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultvalue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : "css-checkbox"
		});
		$(checkHTML).find(".checkbox").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultvalue[i].label));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i,
			"class"	  : "css-label"
		});
		$(checkHTML).find(".checkbox").append(labelClone);
	}	
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