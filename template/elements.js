languagePlugin(current_lang);

var additional_class 		 = "col-md-6 no-padding";
var selector_panel_title 	 = ".panel-title";
var selector_form_row 		 = ".form-row";
var selector_p_r_5 			 = ".p-r-5";
var selector_label 			 = "label";
var selector_span 			 = "span";
var selector_textarea 		 = "textarea";
var selector_input 			 = "input";
var selector_ul 			 = "ul";
var selector_li 			 = "li";
var selector_select_listitem = ".selected-listitem";
var selector_span			 = "span";
var selector_switch			 = ".switch";
var selector_radio_btn		 = ".radio-btn";
var selector_checkbox		 = ".checkbox";
var selector_file			 = ".file";
var selector_input_file		 = ".input-file";
var selector_app_error		 = ".app-error";
var selector_selected_file	 = ".selected-file-name";


var class_switch_input 	 	 = "switch-input";
var class_switch_selection	 = "switch-selection";
var class_switch_label		 = "switch-label";
var class_switch_label_off 	 = "switch-label-off";
var class_switch_label_on 	 = "switch-label-on";
var class_css_checkbox		 = "css-checkbox";
var class_css_label			 = "css-label";

var class_input_file		 = "input-file";
var class_multi_file		 = "multi";
var class_selected_file	 	 = "selected-file-name";


var btn_normal 			= '<button class="uie-btn uie-btn-primary">Generate Form</button>';
var btn_disable 		= '<button class="uie-btn uie-primary-disable" type="button">Disable</button>';
var btn_error 			= '<button class="uie-btn uie-primary-error" type="button">Error</button>';
var btn_warning 		= '<button class="uie-btn uie-primary-warning" type="button">Warning</button>';
var btn_normal_large 	= '<button class="uie-btn uie-primary-large-button" type="button">'+
							'<span class="glyphicon glyphicon-filter button-icon-align-left" aria-hidden="true"></span>'+
						'</button>';
var btn_filter = '<button class="uie-primary-button margin-5 uie-button uie-icon-btn" type="button">'+
					'<span class="btn-icon"><span class="svg" data-svg="svg-filter"></span></span>'+
					'<div class="btn-value"></div>'+
				'</button>';
var btn_reset = '<button class="uie-btn uie-secondary-btn">Reset</button>';

var ele_label = '<div class="form-col-1">'+
					'<label class="label"></label>'+
				'</div>';			
var ele_radio = '<div class="p-r-5">'+
						'<div class="radio-btn">'+
						'</div>'+
					'</div>';							
var ele_switch = '<div class="p-r-5">'+
						'<div class="switch">'+
						'</div>'+
					'</div>';				
var ele_input = '<div class="p-r-5">'+
						'<input class="text-box" />'+
					'</div>';				
var ele_textarea = '<div class="p-r-5">'+
						'<textarea class="textarea-box"></textarea>'+
					'</div>';			
var ele_file_upload = '<div class="col-md-6 form-col-2 p-r-5">'+
						'<div class="input-group '+class_input_file+'" >'+
								'<div class="form-control '+class_selected_file+'">'+$.i18n.prop('no_file_selected')+'</div>'+
								'<span class="input-group-addon">'+
									'<a class="btn btn-primary" href="javascript:;">'+$.i18n.prop('choose_file')+
									  '<input />'+
									'</a>'+
								  '</span>'+
                            '</div>'+
					  '</div>'; 			
var ele_dropdown = '<div class="p-r-5">'+
						'<div class="dropdown-list">'+
							'<div class="selected-listitem">'+$.i18n.prop("click_me")+'</div>'+
								'<ul>'+
									'<li value="">'+$.i18n.prop("click_me")+'</li>'+
								'</ul>'+
								'<input class="dropdown-item" type="hidden" />'+
						'</div>'+
					'</div>';
var ele_checkbox = '<div class="p-r-5">'+
						'<div class="checkbox">'+
						'</div>'+
					 '</div>';				 					 
var div_col_md_6 	= '<div class="form-row col-md-6 clearfix"></div>';
var div_form_col_2 	= '<div class="form-col-2"></div>';
var div_col_md_12 	= '<div class="col-md-12 clearfix"></div>';