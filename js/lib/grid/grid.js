/*!
* jQuery custom datagrid plugin
* defaults:define default parameters used in grid
* methods:define functions of grid
* addGrid:add grid in table
* addCheckBox:add checbox in grid's first column
* addAction:get html of expandable plus icon in responsive
* addRecordActions:get html of action buttons[add/edit/batch-update]
* buildPagination:build dynamic pagination
* addNoRows:get html of serial no.
* addRows:generate table rows dynamically
* addColumns:generate table columns dynamically
* disableAction:disabled all actions if user has not permission to access it
* addMoreFields:generate html and content to add new records field
* addSearchMoreField:generate html and content to create search filer fields
* expandContent:click on plus icon in responsive hidden data will be shown/hide
* addValidationClass:validation purpose
* json_parse:pase json data object
* checkWidth:check width and set content in table
* changePage:ajax call when pagination data will be changed
* changeSortOrder:ajax call when sorting data
* clickPaginationLink:pagination next/prev ajax call
* filterData:search filter functionality ajax call
* addSearchCriteria:append html to new div when any search criteria selected
* checkAllCheckBox:select all checkbox in single click
* init:call plugin
* addAction:get html of action buttons[add/edit/batch-update]
*/

 var test = "test";
(function ($) {
   
	$.fn.customGrid = function(options){
		var self = $(this);
		var checkBox;
		var actionBtn;
		var pagination;
		var pageHeader;
		var sortClass = "";
		var columnOrder;
		var RowOrder;
		var setClass;
		var triggerPrompt = 0;
		var defaults = $.extend({
			paginationUrl:'grid/getPageDetails',
			filterUrl:'grid/filterGrid',
			sortUrl:'grid/gridSorting',
			gridRecords: [],
			paging: true,
			pagestat: 'records|Found total {totalRecord} records',
			pagetext: 'Page',
			outof: ' {totalPage} | View',
			recordOption:[25,50,100],
			recordPerPage:25,
			totalPages:0,
			totalRecords:0,
			currentPage:1,
			gridActions:{
					"batchEditAction":false,
					"saveAction":false,
					"deleteAction":false,
					"columnAction":false,
					"addAction":false
			}
		},options);
		var methods = {
			json_parse : function(data){
				var obj = jQuery.parseJSON(data);
				return obj;
			},
			buildPagination : function(pageData){
				if(!defaults.paging) return false;
				
				var pagination_html = '';
				var getPage = generate_pagination_options(defaults.totalPages,0,"test",defaults.currentPage);
				var getPageRecords = generate_pagination_options(defaults.recordOption,1,"test",defaults.recordPerPage);
				var mapObj = {
					   "@@pagination_option@@"		  : $(getPage).prop("outerHTML"),
					   "@@pagination_option_records@@": $(getPageRecords).prop("outerHTML"),
					   "##total_pages##"			  : defaults.totalPages,
					   "{{pagination.page}}"		  : $.i18n.prop("pagination.page"),
					   "{{pagination.page_of}}"  	  : $.i18n.prop("pagination.page_of"),
					   "{{pagination.page_view}}"     : $.i18n.prop("pagination.page_view"),
					   "{{pagination.page_records}}"  : $.i18n.prop("pagination.page_records"),
					   "{{pagination.page_records_found}}"  : $.i18n.prop("pagination.page_records_found"),
					   "##total_records##"			  : defaults.totalRecords
				};
				pagination_html = replaceWithObject(pagination_sections,grid_pagination_wrapper,mapObj);
				pagination_html = replaceWithObject(pagination_sections,pagination_html,mapObj);
				$(pagination_html).appendTo(pagination_block_wrapper);

			},
			buildActions: function(){
				if(!defaults.paging) return false;

				var grid_actions = defaults.gridActions;
				var grid_action_html = '';

				grid_action_html += grid_actions.batchEditAction ? grid_icon_edit: '';
				grid_action_html += grid_actions.saveAction 	 ? grid_icon_save: '';
				grid_action_html += grid_actions.deleteAction 	 ? grid_icon_delete: '';
				grid_action_html += grid_actions.columnAction    ? grid_icon_action: '';
				grid_action_html += grid_actions.addAction       ? grid_icon_add: '';
				
				grid_action_html = $(grid_actions_wrapper).append(grid_action_html);
				$(pagination_block_wrapper).append(grid_action_html);
			},
			loadDefaults: function(data){
				// Load defaults for pagination
				defaults.totalRecords  = data.gridRecords.rowConfig.totalRecords;
				defaults.totalPages    = data.gridRecords.rowConfig.totalPages;
				defaults.recordPerPage = data.gridRecords.rowConfig.recordsPerPage;
				defaults.currentPage   = data.gridRecords.rowConfig.currentPageNo;
				defaults.paging   	   = data.gridRecords.rowConfig.showPagination ? data.gridRecords.rowConfig.showPagination : defaults.paging;
				
				// Load defaults for grid actions
				defaults.gridActions   = data.gridActions.actions ? data.gridActions.actions : defaults.gridActions;
			},
			generateGrid: function(data){
				methods.loadDefaults(data);
				methods.buildPagination();
				methods.buildActions();
				//buildColumns();
				//buildRows();
				//buildActions();
				custom_dropdown_list();
			},
			init : function(){
				methods.generateGrid(defaults.gridRecords);
			}
		};
		return methods.init();
	};
})(jQuery);