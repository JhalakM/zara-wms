/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

var mainWrapper = "";
var add_class_value = "";

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
	for(var fe = 0; fe < formElement.length; fe++){
		generateFormRow(formId);
		generateLabel(formId,formElement[fe].labelKey);
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
				if(formElement[fe].switch == undefined)
					window[functionCallback](formId,formElement[fe]);
				else
					generate_switch(formId,formElement[fe]);
				break;
			case "checkbox":
				window[functionCallback](formId,formElement[fe]);
				break;
			case "file":
				window[functionCallback](formId,formElement[fe]);
				break;
		}
		
		if(typeof formElement[fe].additional != "undefined"){
			functionCallback = "generate_"+formElement[fe].additional.type;
			window[functionCallback](formId,formElement[fe].additional,1);
		}
	}
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

function generate_text(formId,formElement,flag){
	var inputHTML  = "";
	add_class_value = (flag == 1)?additional_class:"";
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	if(formElement.format != undefined){
		var format = formElement.format;
		switch(format){
			case "date":
				inputHTML  =  $(ele_input).appendTo(mainWrapper)
									.find("input").attr({
										"name"        : formElement.name,
										"tabindex"    : formElement.tabIndex,
										"type"        : formElement.type,
										"data-minDate": formElement.minDate,
										"id"	      : formElement.name,
										"data-format" : formElement.dateFormat
									});
				datePicker("#"+formElement.name);
				break;
			case "time":
				break;
		}
	}else{
		inputHTML  = $(ele_input).appendTo(mainWrapper)
						.find("input").attr({
							"name"    : formElement.name,
							"tabindex": formElement.tabIndex,
							"type"    : formElement.type
						}).parent().addClass(add_class_value);
	}
	
	return inputHTML;
}


function generate_textarea(formId,formElement){
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	var textareaHTML  =  $(ele_textarea).appendTo(mainWrapper)
							.find("textarea").attr({
								"name"    : formElement.name,
								"tabindex": formElement.tabIndex,
								"type"    : formElement.type
							});
	return textareaHTML;
}

function generate_dropdown(formId,formElement){
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	var dropdownHTML  =  $(ele_dropdown).appendTo(mainWrapper);
	var liClone;
	for(var i=0; i<formElement.defaultValue.length; i++){
		liClone = document.createElement("li");
		$(liClone).attr({
			"value" : formElement.defaultValue[i].value,
			"rel"	: formElement.defaultValue[i].value
		});
		$(liClone).html(edit_icon+" "+formElement.defaultValue[i].label);
		dropdownHTML.find("ul").append(liClone);
	}
	dropdownHTML.find("input").attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
	});
	custom_dropdown_list();
	return dropdownHTML;
}


function generate_switch(formId,formElement){
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	switchHTML = $(ele_switch).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone = document.createElement("span");
	var add_class = "";
	for(var i=0; i<formElement.defaultValue.length; i++){
		add_class = (i==0)?"switch-label-off":"switch-label-on";
		inputClone = document.createElement("input");
		labelClone = document.createElement("label");
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : "switch-input"
		});
		$(switchHTML).find(".switch").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].labelKey));
		$(labelClone).attr({
			"for" 	: formElement.name+"-"+i,
			"class" : "switch-label "+ add_class
		});
		$(switchHTML).find(".switch").append(labelClone);
	}	
	$(spanClone).attr({
		"class" : "switch-selection"
	});
	$(switchHTML).find(".switch").append(spanClone);
}

function generate_radio(formId,formElement){
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	radioHTML = $(ele_radio).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	for(var i=0; i<formElement.defaultValue.length; i++){
		inputClone = document.createElement("input");
		labelClone = document.createElement("label");
		spanClone  = document.createElement("span");
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].labelKey));
		$(labelClone).append(spanClone);
		$(labelClone).find("span").html(document.createElement("span"));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i
		});
		$(radioHTML).find(".radio-btn").append(labelClone);
	}	
}


function generate_checkbox(formId,formElement){
	mainWrapper = $(div_form_col_2).appendTo("#"+formId+" .form-row:last");
	checkHTML = $(ele_checkbox).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	for(var i=0; i<formElement.defaultValue.length; i++){
		inputClone = document.createElement("input");
		labelClone = document.createElement("label");
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : "css-checkbox"
		});
		$(checkHTML).find(".checkbox").append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].label));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i,
			"class"	  : "css-label"
		});
		$(checkHTML).find(".checkbox").append(labelClone);
	}	
}

function generate_file(){
	
}


function returnObject(obj){
	return $('<div>').append(obj.clone()).html();
}

function generateButtons(formButtons,formId){
	var buttonHTML = $(div_col_md_12).appendTo("#"+formId);
	if(formButtons[0].submit != "undefiend"){
		var btnSubmit = $(btn_normal);
		$(btnSubmit).attr({
			"type" : "button",
			"name" : formButtons[0].submit.keyName,
		});
		$(btnSubmit).text($.i18n.prop(formButtons[0].submit.keyValue));
		buttonHTML.append(btnSubmit);
	}
	if(formButtons[0].reset != "undefiend"){
		var btnReset = $(btn_normal);
		$(btnReset).attr({
			"type" : "reset",
			"name" : formButtons[0].reset.keyName,
		});
		$(btnReset).text($.i18n.prop(formButtons[0].reset.keyValue));
		buttonHTML.append(btnReset);
	}
	if(formButtons[0].cancel != "undefiend"){
		var btnCancel = $(btn_normal);
		$(btnCancel).attr({
			"type" : "button",
			"name" : formButtons[0].reset.keyName,
		});
		$(btnCancel).text($.i18n.prop(formButtons[0].reset.keyValue));
		buttonHTML.append(btnCancel);
	}
	return buttonHTML;
}