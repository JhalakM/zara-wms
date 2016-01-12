/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

var mainWrapper = "";
var add_class_value = "";

function jsonStringify(jStringData){
	return  JSON.stringify(jStringData);
}

function jsonParse(jParseData){
	return  jQuery.parseJSON(jParseData);
}

function generateElements(formElement,formId){
	var params = new Array();
	for(var fe = 0; fe < formElement.length; fe++){
		generateFormRow(formId);
		generateLabel(formId,formElement[fe].labelKey);
		mainWrapper = $(div_form_col_2).appendTo("#"+formId+" "+selector_form_row+":last");
			if(typeof formElement[fe].multiLevel != "undefined"){
				for(var m = 0; m < formElement[fe].multiLevel.length; m++){
					var multiAttr = formElement[fe].multiLevel;
					//alert(multiAttr[m].name);
					params = [multiAttr[m].name];
					var errorStatus = misConfigError(params,$.i18n.prop("errormsg.config_error"));
					
					if(!errorStatus) return false;
				
					functionCallback = "generate_"+multiAttr[m].type;
					if(typeof multiAttr[m].type != "undefined"){
						if(multiAttr[m].type == "radio" ){
							if(typeof multiAttr[m].switch == "undefined"){
								window[functionCallback](formId,multiAttr[m],1);
							}else{
								generate_switch(formId,multiAttr[m],1);
							}	
						}else{
							window[functionCallback](formId,multiAttr[m],1);
						}
					}
					
					
				}
			}else{
				params = [formElement[fe].name];
				var errorStatus = misConfigError(params,$.i18n.prop("errormsg.config_error"));
				
				if(!errorStatus) return false;
				
				functionCallback = "generate_"+formElement[fe].type;
				if(formElement[fe].type == "radio" ){
					if(typeof formElement[fe].switch == "undefined"){
						window[functionCallback](formId,formElement[fe]);
					}else{
						generate_switch(formId,formElement[fe]);
					}
				}else{
					window[functionCallback](formId,formElement[fe]);
				}
			}
	}
	
}


function generateCaption(formId,formCaption){
	var caption = $("#"+formId).prev(selector_panel_title).text(formCaption);
}
function generateFormRow(formId){
	var formRow = $(div_col_md_6).appendTo("#"+formId);
}

function generateLabel(formId,labelKey){
	var labelHTML = $(ele_label).appendTo("#"+formId+" "+selector_form_row+":last").find(selector_label).text($.i18n.prop(labelKey));
}

function generate_text(formId,formElement,flag){
	var inputHTML  = "";
	add_class_value = (flag == 1)?additional_class:"";
	
	if(formElement.format != undefined){
		var format = formElement.format;
		switch(format){
			case "date":
				inputHTML  =  $(ele_input).appendTo(mainWrapper)
									.find(selector_input).attr({
										"name"        : formElement.name,
										"tabindex"    : formElement.tabIndex,
										"type"        : formElement.type,
										"data-minDate": formElement.minDate,
										"id"	      : formElement.name,
										"data-format" : formElement.dateFormat,
										"data-default-date" : formElement.defaultValue,
										"value" : formElement.defaultValue
									}).parents(selector_p_r_5).addClass(add_class_value);
				datePicker("#"+formElement.name);
				break;
			case "time":
				break;
		}
	}else{
		inputHTML  = $(ele_input).appendTo(mainWrapper)
						.find(selector_input).attr({
							"name"    : formElement.name,
							"tabindex": formElement.tabIndex,
							"type"    : formElement.type,
							"value"	  : formElement.defaultValue
						}).parents(selector_p_r_5).addClass(add_class_value);
	}
	
}


function generate_textarea(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	var textareaHTML  =  $(ele_textarea).appendTo(mainWrapper)
							.find(selector_textarea).attr({
								"name"    : formElement.name,
								"tabindex": formElement.tabIndex,
								"cols"	  : formElement.cols,
								"rows"	  : formElement.rows,
								"type"    : formElement.type,
							}).text(formElement.defaultValue).parents(selector_p_r_5).addClass(add_class_value);
}

function generate_dropdown(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	var dropdownHTML  =  $(ele_dropdown).appendTo(mainWrapper);
	var liClone;
	var inputText = "";
	var inputVal = "";
	for(var i=0; i<formElement.defaultValue.length; i++){
		if(formElement.defaultValue[i].selected == true){
			inputText 	  = formElement.defaultValue[i].label;
			inputVal 	  = formElement.defaultValue[i].value;
			dropdownHTML.find(selector_select_listitem).text(inputText);
		}
		liClone = document.createElement(selector_li);
		$(liClone).attr({
			"value" : formElement.defaultValue[i].value,
			"rel"	: formElement.defaultValue[i].value
		});
		$(liClone).html(formElement.defaultValue[i].label);
		dropdownHTML.find(selector_ul).append(liClone);
	}

	dropdownHTML.find(selector_input).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"value"	  : inputVal
	}).parents(selector_p_r_5).addClass(add_class_value);
}


function generate_switch(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	switchHTML = $(ele_switch).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone = document.createElement(selector_span);
	var add_class = "";
	var selectedValue;
	for(var i=0; i<formElement.defaultValue.length; i++){
		selectedValue = (formElement.defaultValue[i].selected == true)?"checked":"";
		add_class = (i==0)?class_switch_label_off:class_switch_label_on;
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : class_switch_input,
			"checked" : selectedValue
		});
		$(switchHTML).find(selector_switch).append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].labelKey));
		$(labelClone).attr({
			"for" 	: formElement.name+"-"+i,
			"class" : class_switch_label+" "+ add_class
		});
		$(switchHTML).find(selector_switch).append(labelClone);
	}	
	$(spanClone).attr({
		"class" : class_switch_selection
	});
	$(switchHTML).find(selector_switch).append(spanClone).parents(selector_p_r_5).addClass(add_class_value);
}

function generate_radio(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	radioHTML = $(ele_radio).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	var selectedValue;
	for(var i=0; i<formElement.defaultValue.length; i++){
		selectedValue = (formElement.defaultValue[i].selected == true)?"checked":"";
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		spanClone  = document.createElement(selector_span);
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"checked" : selectedValue
		});
		$(radioHTML).find(selector_radio_btn).append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].labelKey));
		$(labelClone).append(spanClone);
		$(labelClone).find(selector_span).html(document.createElement(selector_span));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i
		});
		$(radioHTML).find(selector_radio_btn).append(labelClone).parents(selector_p_r_5).addClass(add_class_value);
	}	
}


function generate_checkbox(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	checkHTML = $(ele_checkbox).appendTo(mainWrapper);
	var inputClone;
	var labelClone;
	var spanClone;
	var selectedValue;
	for(var i=0; i<formElement.defaultValue.length; i++){
		selectedValue = (formElement.defaultValue[i].selected == true)?"checked = checked":"";
		inputClone = document.createElement(selector_input);
		labelClone = document.createElement(selector_label);
		$(inputClone).attr({
			"name"    : formElement.name,
			"tabindex": formElement.tabIndex,
			"type"    : formElement.type,
			"value"	  : formElement.defaultValue[i].value,
			"id"	  : formElement.name+"-"+i,
			"class"	  : class_css_checkbox,
			selectedValue
		});
		$(checkHTML).find(selector_checkbox).append(inputClone);
		$(labelClone).text($.i18n.prop(formElement.defaultValue[i].label));
		$(labelClone).attr({
			"for" : formElement.name+"-"+i,
			"class"	  : class_css_label
		});
		$(checkHTML).find(selector_checkbox).append(labelClone).parents(selector_p_r_5).addClass(add_class_value);
	}	
}

function generate_file(formId,formElement,flag){
	add_class_value = (flag == 1)?additional_class:"";
	
	var fileUploadHTML  = $(ele_file_upload).appendTo(mainWrapper)
							/*.find(selector_gui_input).attr({
								"id"    : formElement.name,
								"class" : class_gui_input
							}).parents(selector_p_r_5).addClass(add_class_value)*/;	
							
	$(fileUploadHTML).find(selector_gui_file).attr({
				"name"    	: formElement.name,
				"tabindex"	: formElement.tabIndex,
				"type"    	: formElement.type,
				"id"    	: formElement.name,
				"multiple"  : formElement.multiple
			});
	
	if(typeof formElement.fileValidation != "undefined"){
		$(fileUploadHTML).find(selector_gui_file).attr({
				"data-accept"	: formElement.fileValidation.accept,
				"data-size"		: formElement.fileValidation.size
			});
	}
	setMultiFilePlugin(formElement.name);
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
			"onclick" : "sendFormData('#"+formId+"')"
		});
		$(btnSubmit).text($.i18n.prop(formButtons[0].submit.keyValue));
		buttonHTML.append(btnSubmit);
	}
	if(formButtons[0].reset != "undefiend"){
		var btnReset = $(btn_reset);
		$(btnReset).attr({
			"type" : "reset",
			"name" : formButtons[0].reset.keyName,
		});
		$(btnReset).text($.i18n.prop(formButtons[0].reset.keyValue));
		buttonHTML.append(btnReset);
	}
	if(formButtons[0].cancel != "undefiend"){
		var btnCancel = $(btn_reset);
		$(btnCancel).attr({
			"type" : "button",
			"name" : formButtons[0].cancel.keyName,
		});
		$(btnCancel).text($.i18n.prop(formButtons[0].cancel.keyValue));
		buttonHTML.append(btnCancel);
	}
	return buttonHTML;
}