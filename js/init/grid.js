/*
|@author : Intech Creative Services
|@desc   : Function need to use on init level.
*/

$(document).ready(function(){
	var response_panel = '{"errorCode":0,"successMessage":"responce_success.","returnObject":{"panelConfig":{"showGrid":"true","icon":"table-grid","actions":{"manageColumns":true,"range":false,"multiSorting":true,"filter":true},"titleKey":"ContainerInventory.tableCaption"}}}';
	generatePanel(response_panel);
	
	var response_grid = JSON.parse('{"errorCode":0,"successMessage":"response.success","returnObject":{"gridRecords":{"rowConfig":{"recordData":[{"recordId":14937348,"record":[{"columnNo":1,"value":"CSIHOLDBYSVC"},{"columnNo":2,"value":"*"},{"columnNo":3,"value":"BOS"},{"columnNo":4,"value":"1862953737"}],"rowDisplayNm":1,"rowId":"14937348$$CSIHOLDBYSVC$$*$$BOS$$SYSTEM$$589379040$$1862953737"},{"recordId":14937347,"record":[{"columnNo":1,"value":"CSIHOLDBYSVC"},{"columnNo":2,"value":"*"},{"columnNo":3,"value":"CHS"},{"columnNo":4,"value":"5187891347"}],"rowDisplayNm":2,"rowId":"14937347$$CSIHOLDBYSVC$$*$$CHS$$SYSTEM$$634281293$$5187891347"}],"totalRecords":14,"totalPages":1,"currentPageNo":1,"recordsPerPage":25},"columnConfig":{"totalColumnCount":4,"columnValueObjects":[{"columnNameKey":"ContainerInventory.Application","isPK":true,"sortOrder":3,"columnNo":1,"isSortable":true,"sorting":"asc","columnName":"APP_I","isAddDisabled":1,"colWidthPercentage":10,"isEditable":true},{"columnNameKey":"ContainerInventory.Category","isPK":true,"sortOrder":2,"columnNo":2,"isSortable":true,"sorting":"desc","columnName":"CATEGORY_C","isAddDisabled":0,"colWidthPercentage":26,"isEditable":true}]}},"gridActions":{"actions":{"batchEditAction":true,"saveAction":false,"deleteAction":true,"columnAction":false,"addAction":true}}}}');
	
	var gridObject = response_grid.returnObject;
	$('#datatable_ajax').customGrid({
		gridRecords: gridObject
	});
});

$(window).load(function(){
	generateScrollbar();
});
function generatePanel(response_panel)
{
	var json_response = JSON.parse(response_panel);
	var panel_config  = json_response.returnObject.panelConfig;
	var panel_icon	  =	panel_config.icon;
	var panel_title   =	panel_config.titleKey;
	var panel_actions = panel_config.actions;
	
	
	// HTML generation for panel icon
	panel_icon ? $(panel_heading_icon).appendTo(panel_head_wrapper).find('i').addClass(panel_icon) : '';
	
	
	// HTML generation for panel title
	panel_title ? $(panel_heading_title).text(panel_title).appendTo(panel_head_wrapper) : '';
	
	
	// HTML generation for panel actions
	var panel_actions_group_html = '';
	panel_actions_group_html += panel_actions.printrecords  ? panel_icon_print: '';
	panel_actions_group_html += panel_actions.filter 	    ? panel_icon_filter: '';
	panel_actions_group_html += panel_actions.range 	    ? panel_icon_range: '';
	panel_actions_group_html += panel_actions.multiSorting  ? panel_icon_multisort: '';
	panel_actions_group_html += panel_actions.manageColumns ? panel_icon_mngcolumns: '';
	
	panel_actions_group_html ? $(panel_actions_group).append(panel_actions_group_html).appendTo(panel_head_wrapper) : '';
}