var panel_head_wrapper = '.panel-block-head'; 

/* Panel UI */
var panel_heading_icon    = '<div class="panel-block-icon"><i class="fa"></i></div>';
var panel_heading_title   = '<div class="panel-block-heading">Table Example</div>';
var panel_actions_group   = '<div class="app-action-group"></div>'; 

var panel_icon_print 	  = '<a href="#"><i class="fa fa-print"></i></a>';
var panel_icon_range 	  = '<a href="#"><i class="fa fa-print"></i></a>';
var panel_icon_filter 	  = '<a href="#"><i class="fa fa-filter"></i></a>';
var panel_icon_multisort  = '<a href="#"><i class="fa fa-sort-amount-desc"></i></a>';
var panel_icon_mngcolumns = '<a href="#"><i class="fa fa-print"></i></a>';

var grid_icon_add         = '<a href="#"  data-toggle="modal" data-target="#add-record"><i class="fa fa-plus"></i></a>';
var grid_icon_edit        = '<a href="#"><i class="fa fa-print"></i></a>';
var grid_icon_save        = '<a href="#"><i class="fa fa-print"></i></a>';
var grid_icon_delete      = '<a href="#"><i class="fa fa-print"></i></a>';
var grid_icon_action      = '<a href="#"><i class="fa fa-print"></i></a>';

/* Pagination UI */
var pagination_block_wrapper 	= '.pagination-block';
var dropdown_selector			= '.dropdown-list';
var pagination_options 			= '<div class="dropdown-list">'+
												'<div class="selected-listitem"></div>'+
													'<ul>'+
													'</ul>'+
													'<input class="dropdown-item" type="hidden" />'+
										  '</div>';
					

var grid_pagination_wrapper 	= '<div class="pages-info">'+
                                     '<div class="page-options">'+
									      '<span>{{pagination.page}}</span>'+ 
										      '<a href="javascript:void(0);"><i class="fa fa-chevron-left"></i></a>'+
												   "@@pagination_option@@"+
												'<a href="javascript:void(0);"><i class="fa fa-chevron-right"></i></a>' + 
											'<span>{{pagination.page_of}} ##total_pages## </span>'+
										'</div>' +
										'<div class="page-record-options"><span>{{pagination.page_view}}</span>' +  												   
												"@@pagination_option_records@@"+
											'<span>{{pagination.page_records}}</span>'+
										'</div>'+
										'<div class="page-total-records">'+
											' {{pagination.page_records_found}}'+
										'</div>'+
										'</div>'+
								 '</div>';
var grid_actions_wrapper 	= '<div class="grid-action-group"></div>';
							   
var pagination_sections 	    = '@@pagination_option@@|@@pagination_option_records@@|##total_pages##|{{pagination.page}}|{{pagination.page_of}}|{{pagination.page_view}}|{{pagination.page_records}}|{{pagination.page_records_found}}|##total_records##';