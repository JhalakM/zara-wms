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
(function ($) {

	$.fn.dataGrid = function(options){
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
			url : false,
			datatype:'json',
			method : 'POST',
			columns: [],
			autoLoad : false,
			paging: false,
			pageno : 1,
			total : 0,
			pagestat: 'records|Found total {totalRecord} records',
			pagetext: 'Page',
			outof: ' {totalPage} | View',
			recordOption:[25,50,100],
			recordPerPage:25,
			totalPages:0,
		},options);
		var methods = {
			addCheckBox : function(rowId,recordIdString){
				checkBox = $(checkBoxTDContainer);
				$(checkBox).find("input").attr({"data-row":rowId,"id":"box"+rowId,"data-row-string":recordIdString});
				$(checkBox).find("label").attr({"for":"box"+rowId});
				return $(checkBox);
			},
			addAction : function(rowId){
				actionBtn = $(plusBtnTDContainer);
				actionBtn.find(".btn-more-view").attr("id",rowId);
				return $(actionBtn);
			},
			addRecordActions : function(){
				$(".topPanel").append(recordActions);
			},
			buildPagination : function(pageData){
				$(".reset-data_pagination").html("");
				defaults.paging = true;
				
				pagination = $(".pagination-panel").append($(gridViewPaginationContainer));
				$(pagination).find(".pageText").text(defaults.pagetext);
				var outOf = defaults.outof.replace(/{totalPage}/,pageData.totalPages);
				$(pagination).find(".span2").text(outOf);
				var pageRecords = defaults.pagestat.replace(/{totalRecord}/,pageData.totalRecords);
				$(pagination).find(".total_record").text(pageRecords);
				defaults.recordPerPage = pageData.recordsPerPage;
				/* code for pagination record per page */
				var opt = '',
					sel = '';
				for (var nx = 0; nx < defaults.recordOption.length; nx++) {
					if (pageData.recordsPerPage == defaults.recordOption[nx]) sel = 'selected= "selected"';
					else sel = '';
					opt += "<option value='" + defaults.recordOption[nx] + "' " + sel + " >" + defaults.recordOption[nx] + "&nbsp;&nbsp;</option>";
				}
				$(pagination).find(".records_select").append(opt);
				/* code for pagination for current page */
				var opt_p = '',
					sel_p = '';
				for (var nxp = 1; nxp <= pageData.totalPages; nxp++) {
					if (pageData.currentPageNo == nxp) sel_p = 'selected= "selected"';
					else sel_p = '';
					opt_p += "<option value='" + nxp + "' " + sel_p + " >" + nxp + "&nbsp;&nbsp;</option>";
				}
				$(pagination).find(".page_no_select").append(opt_p);
				if(pageData.currentPageNo == 1){
					$(".prev").addClass("disabled_action");
				}else{
					$(".prev").removeClass("disabled_action");
				}
				if(pageData.currentPageNo == pageData.totalPages){
					$(".next").addClass("disabled_action");
				}else{
					$(".next").removeClass("disabled_action");
				}
				defaults.totalPages = pageData.totalPages;
				methods.addRecordActions(); 
				methods.clickPaginationLink();
				return $(pagination);
			},
			addNoRows : function(message,colLength){
				var tbody = document.createElement('tbody');
				var tr = document.createElement('tr');
				$(tr).attr({
							"role":"row",
							"class":"rowModels"
						});
				var td = document.createElement('td');
				$(td).attr({
							"colspan":colLength.length+2
						});
				$(td).text(message);
				$(tr).append(td);
				$(self).append(tr);
			},
			addRows : function(RowModels){
				var tbody = document.createElement('tbody');
				$(self).find(".rowModels").remove();
				$.each(RowModels, function (index, records) {
					var tr = document.createElement('tr');
					$(tr).attr({
								"role":"row",
								"class":"rowModels"
							});
					checkBox = methods.addCheckBox(records.recordId,records.rowId);
					$(tr).append(checkBox);
					var recordLength = records.record;
					var recordDispNum = $(DispNoTDContainer);
					recordDispNum.find("span").text(records.rowDisplayNm);
					actionBtn = methods.addAction(records.recordId);
					$(recordDispNum).prepend(actionBtn);
					$(tr).append(recordDispNum);
					for(var r=0;r<recordLength.length;r++)
					{
						var thVal = $(self).find(".heading");
						var td = document.createElement('td');
						$(td).addClass("dark");
						
						$(td).attr({
							"data-value": recordLength[r].value,
							"data-column-no":recordLength[r].columnNo,
							"data-editable"	: $(thVal).children("th[data-column-id="+recordLength[r].columnNo+"]").attr("data-column-isPK"),
							"data-filterable": $(thVal).children("th[data-column-id="+recordLength[r].columnNo+"]").attr("data-column-filterable"),
							"data-row-id": records.recordId,
							"default-color":"#F9F9F9",
							"data-record-id":records.rowId
						});
						//check is pk true then cell has been filled with background color.
						var checkisPK = $(thVal).children("th[data-column-id="+recordLength[r].columnNo+"]").attr("data-column-isPK");
						var vals = (recordLength[r].value != undefined)?recordLength[r].value:"";
						var createInput = '<span>'+vals+'</span><i class="new_values" style="display:none;">'+vals+'</i>';
						if(checkisPK ==  "true"){
							$(td).css("background-color","pink");
							$(td).attr("default-color","pink");
						}else{
							
							var possiblevalues = $(thVal).children("th[data-column-id="+recordLength[r].columnNo+"]").attr("possiblevalues");
							if(possiblevalues ==  undefined){
								var columnVal = $(".heading th[data-column-id = '"+recordLength[r].columnNo+"']").attr("data-column-name");
								createInput += '<textarea  name="'+columnVal+'" column-no="'+recordLength[r].columnNo+'" id="'+records.recordId+'"  placeholder="'+vals+'" class="showHiddenValue animated-textarea"  style="display:none;">'+vals+'</textarea>';
							}else{
								
								var possiblevalues = $(thVal).children("th[data-column-id="+recordLength[r].columnNo+"]").attr("possiblevalues");
								var columnVal = $(".heading th[data-column-id = '"+recordLength[r].columnNo+"']").attr("data-column-name");
								if(possiblevalues ==  undefined){
									
									createInput += '<textarea  name="'+columnVal+'" column-no="'+recordLength[r].columnNo+'" id="'+records.recordId+'"  placeholder="'+vals+'" class="showHiddenValue animated-textarea"  style="display:none;">'+vals+'</textarea>';
								}else{
									createInput += '<select name="'+columnVal+'" class="showHiddenValue" column-no="'+recordLength[r].columnNo+'" id="'+records.recordId+'"   style="display:none;">';
									var splitVal = possiblevalues.split(",");
									var selected = "";
									for(var i=0;i<=possiblevalues.length;i++){
										if(splitVal[i] != undefined){
											if(vals == splitVal[i])
											{
												selected = "selected='selected'";
											}else{
												selected = "";
											}
											createInput += '<option value="'+splitVal[i]+'" '+selected+' >'+splitVal[i]+'</option>';
										}
									}
									createInput += '</select>';
									//createInput += '<textarea  name="'+columnVal+'" column-no="'+recordLength[r].columnNo+'" id="'+records.recordId+'"  placeholder="'+vals+'" class="showHiddenValue animated-textarea"  style="display:none;">'+vals+'</textarea>';
								}
							}
						}
						$(td).html(createInput);
						$(tr).append(td);
					}
					$(self).append(tr);
				});
				triggerPrompt = 0;
				methods.changePage();
			},
			addColumns : function(colModels){
				var tr = document.createElement('tr');
					$(tr).attr({
							"role":"row",
							"class":"heading"
					});
				$(tr).append(checkBoxTHContainer);
				$(tr).append(DispNoTHContainer);
				
				for(var c=0;c < colModels.length;c++)
				{
					var th = document.createElement('th');
					
					if(colModels[c].defaultSortOrder != "" && colModels[c].defaultSortOrder != undefined){
						
						sortClass = "sorting";
					}else{
						sortClass = "";
					}
					var getper = (colModels[c].colWidthPercentage*96)/100;
					$(th).attr({
						"data-column-id": colModels[c].columnNo, 
						"data-column-name": colModels[c].columnName,
						"data-column-visible": colModels[c].isVisible,
						"data-column-isPK": colModels[c].isPK,
						"data-column-isNullable": colModels[c].isNullable,
						"default-sort-order":colModels[c].defaultSortOrder,
						"width":getper+"%",
						"aria-controls":$(self).attr("id"),
						"data-column-filterable":colModels[c].isFilterable,
						"data-column-current-filterEnabled":colModels[c].isFilterEnabled,
						"data-column-current-filterOp":colModels[c].currentFilterOperation,
						"data-column-current-filterStatus":colModels[c].currentFilterStatus,
						"data-column-dataType":colModels[c].colDataType,
						"rowspan":"1",
						"colspan":"1",
						"possibleValues":colModels[c].possibleValues,
						"class":sortClass,
						"isAddDisabled":colModels[c].isAddDisabled,
						"defaultValueForAdd":colModels[c].defaultValueForAdd
					});
					$(th).text(colModels[c].columnDispName);
					$(tr).append(th);
				}
				$(self).append(tr);
				
			},
			addGrid : function(data){
				pageHeader = $(pageTableHeader);
				$(pageHeader).text(data[0].caption);
				$(".menu-toggle").append(pageHeader);
				if(data[1].totalPages != 0){
					methods.addColumns(data[0].columnValueObjects);
					methods.addRows(data[1].recordData);
					methods.buildPagination(data[1]);
				}else{
					methods.addColumns(data[0].columnValueObjects);
					methods.addNoRows("No records Found.",data[0].columnValueObjects);
				}
				
				methods.disableAction(data);
				methods.checkWidth();
				methods.changePage();
				methods.expandContent();
				methods.changeSortOrder();
				isEditableCheck();
				methods.checkAllCheckBox();
				methods.filterData();
				methods.addSearchMoreField(data[0].columnValueObjects);
				methods.addSearchCriteria();
				if(typeof data[2].filterColumns != 'undefined'){
					methods.filterObjects(data[2]);
				}
			},
			disableAction : function(data){
				if(data[0].isAddAllow == false){
					$("#fn-add-new").addClass("disabled_action");
				}else if(data[0].isAddAllow == true){
					$("#fn-add-new").removeClass("disabled_action");
				}
				if(data[0].isEditAllow == false){
					$(".save_action").addClass("disabled_action");
					$(".batch_action").addClass("disabled_action");
				}else if(data[0].isEditAllow == true){
					$(".save_action").removeClass("disabled_action");
					$(".batch_action").removeClass("disabled_action");
				}
				if(data[0].isDeleteAllow == false){
					$(".delete_action").addClass("disabled_action");
				}else if(data[0].isDeleteAllow == true){
					$(".delete_action").removeClass("disabled_action");
				}
			},
			addMoreFields : function(addData){
				var add_more = addData[0].columnValueObjects;
				
				var addMore = $("#sec-fn-add-new #addNew").html(addMoreSectionContainer);
				for(var c=0;c<add_more.length;c++)
				{
					var columnsAdd = $(multiPleColumns);
					var createInput = "";
					addMore.find(".add-filed-sec").append(columnsAdd);
					columnsAdd.find("label").text(add_more[c].columnDispName);
					var lowerCaseName = add_more[c].columnDispName.toLowerCase(add_more[c].columnDispName);
					if(add_more[c].possibleValues == undefined){
						if(add_more[c].isAddDisabled == 0){
						columnsAdd.find("input").attr({
							"name":add_more[c].columnName,
							"placeholder":add_more[c].columnDispName
							});
						}else{
							columnsAdd.find("input").attr({
								"name":add_more[c].columnName,
								"placeholder":add_more[c].columnDispName,
								"readonly":"readonly",
								"disabled":"disabled",
								"value":add_more[c].defaultValueForAdd
							});
						}
						
						var getClass = methods.addValidationClass(add_more[c].colDataType);
						columnsAdd.find("input").addClass(getClass);
					}else{
						var possible_values = add_more[c].possibleValues;
						columnsAdd.find("input").remove();
						//alert(add_more[c].possibleValues);
						var splitVal = possible_values.toString().split(",");
						for(var i = 0;i<=possible_values.length;i++){
							if(splitVal[i] != undefined){
								createInput += '<option value="'+splitVal[i] +'">'+splitVal[i]+'</option>';
							}
						}
						columnsAdd.find(".input-field").append('<select name='+add_more[c].columnName+' class="select" style="width:30%;">'+createInput+'</select>');
					}
				}
				$(".addMore_content").html(add_more_content);
				addMoreFieldsData();
				//$('.validation_error_class').validator({});
				deleteRow();
			},
			addSearchMoreField : function(data){
				var getThVal = $(self).find(".heading");
				$("#search_add_more option:not(:first-child)").each(function(){
					$(this).remove();
				});
				for(var c=0;c<data.length;c++)
				{
					var isFilter = $(getThVal).children("th[data-column-id="+data[c].columnNo+"]").attr("data-column-filterable");
					if(isFilter == "true")
					{
						var opt_search = '';
						opt_search += "<option value='" + data[c].columnNo + "' data-value-name='"+data[c].columnName+"' >" + $(getThVal).children("th[data-column-id="+data[c].columnNo+"]").text() + "</option>";
					}
					$("#search_add_more").append(opt_search);
				}
			},
			expandContent :function(){
				$(".toggle-plus-div").remove();
				$(".btn-more-view").click(function(){
					if($(this).hasClass("collapse-grid")){
						$("#"+$(this).attr("id")).removeClass("collapse-grid");
						$("#div-"+$(this).attr("id")).hide();
					}else{
						$(this).addClass("collapse-grid");
						var divs = $(".toggle-plus-div");
						$(additionalTrContainer).insertAfter($(this).parents('tr'));
						var thVal = $(self).find(".heading");
						var getParent = $(this).parents('tr');
						getParent.next(".toggle-plus-div").attr("id","div-"+$(this).attr("id"));
						var rowCheck = $(this).attr("id");
						var createInput = "";
						var selected = "";
						var newValue;
						var origial_value;
					if($( window ).width() < 768 && $( window ).width() > 360){
						getParent.children("td:gt(3)").each(function(){
							var expandedDiv = $(additionalDivContainer);
							var colName = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").text();
							var possibleValues = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").attr("possibleValues");
							var roweId = $(this).attr("data-row-id");
							expandedDiv.find("label").text(colName+": ");
							//alert($(this).find("span").text());
							origial_value = $(this).find("span").text();
							expandedDiv.find("span").text(origial_value);
							expandedDiv.find(".expand-contents").attr("column-no",$(this).attr("data-column-no"));
							newValue = $(this).find(".new_values").text();
							if(newValue != $(this).find("span").text() )
							{
								expandedDiv.find("span").text(newValue);
								origial_value = newValue;
							}
							if($(this).attr("data-editable") == "false"){
								if(possibleValues != undefined){
										var splitVal = possibleValues.split(",");
										for(var i =0;i<=possibleValues.length;i++){
											if(splitVal[i] != undefined){
												if(origial_value == splitVal[i]){
													selected = "selected='selected'";
												}else{
													selected="";
												}
												createInput += '<option value="'+splitVal[i]+'" '+selected+'>'+splitVal[i]+'</option>';
											}
										}
										expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<select id="'+roweId+'" class="editable-text showHiddenValue select" style="display:none;width:30%;" column-no="'+$(this).attr("data-column-no")+'" name="'+colName+'">'+createInput+'</select>');
								}else{
									expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<textarea class="editable-text showHiddenValue animated-textarea" style="display:none;width:100%;"></textarea>');
									expandedDiv.find(".editable-text").text(origial_value);
								}
								
								expandedDiv.find(".editable-text").attr("id",roweId);
							}else{
								expandedDiv.find(".editable-text").remove();
								expandedDiv.find("span").removeClass("clickToEdit");
							}
							$(".toggle-plus-div td").attr({
									"colspan":$(getParent).children("td").length,
								});
								if(roweId == rowCheck ){
									$(expandedDiv).appendTo("#div-"+rowCheck+" .addContent");
									$("#div-"+rowCheck).next("#div-"+rowCheck).remove();
								}						
						});
					}else if($( window ).width() >= 768 && $( window ).width() < 980){
						getParent.children("td:gt(4)").each(function(){
							var expandedDiv = $(additionalDivContainer);
							var colName = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").text();
							var roweId = $(this).attr("data-row-id");
							expandedDiv.find("label").text(colName+": ");
							origial_value = $(this).find("span").text();
							expandedDiv.find("span").text(origial_value);
							expandedDiv.find(".expand-contents").attr("column-no",$(this).attr("data-column-no"));
							var possibleValues = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").attr("possibleValues");
							newValue = $(this).find(".new_values").text();
							if(newValue != $(this).find("span").text())
							{
								expandedDiv.find("span").text(newValue);
								origial_value = newValue;
							}
							if($(this).attr("data-editable") == "false"){
								if(possibleValues != undefined){
									var splitVal = possibleValues.split(",");
									for(var i =0;i<=possibleValues.length;i++){
										if(splitVal[i] != undefined){
											if(origial_value == splitVal[i]){
												selected = "selected='selected'";
											}else{
												selected="";
											}
											createInput += '<option value="'+splitVal[i]+'" '+selected+'>'+splitVal[i]+'</option>';
										}
									}
									expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<select id="'+roweId+'" class="editable-text showHiddenValue select" style="display:none;width:30%;" column-no="'+$(this).attr("data-column-no")+'" name="'+colName+'" >'+createInput+'</select>');
								}else{
									expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<textarea class="editable-text showHiddenValue animated-textarea" style="display:none;width:100%;"></textarea>');
									expandedDiv.find(".editable-text").text(origial_value);
								}
								expandedDiv.find(".editable-text").attr("id",roweId);
							}else{
								expandedDiv.find(".editable-text").remove();
								expandedDiv.find("span").removeClass("clickToEdit");
							}
							$(".toggle-plus-div td").attr({
									"colspan":$(getParent).children("td").length,
								});
								if(roweId == rowCheck ){
									$(expandedDiv).appendTo("#div-"+rowCheck+" .addContent");
									$("#div-"+rowCheck).next("#div-"+rowCheck).remove();
								}	
						});
					}else if($( window ).width() <= 360){
							getParent.children("td:gt(2)").each(function(){
								var expandedDiv = $(additionalDivContainer);
								var colName = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").text();
								var roweId = $(this).attr("data-row-id");
								expandedDiv.find("label").text(colName+": ");
								origial_value = $(this).find("span").text();
								expandedDiv.find("span").text(origial_value);
								expandedDiv.find(".expand-contents").attr("column-no",$(this).attr("data-column-no"));
								var possibleValues = $(thVal).children("th[data-column-id="+$(this).attr("data-column-no")+"]").attr("possibleValues");
								newValue = $(this).find(".new_values").text();
								if(newValue != $(this).find("span").text())
								{
									expandedDiv.find("span").text(newValue);
									origial_value = newValue;
								}
								if($(this).attr("data-editable") == "false"){
									if(possibleValues != undefined){
										var splitVal = possibleValues.split(",");
										for(var i =0;i<=possibleValues.length;i++){
											if(splitVal[i] != undefined){
												if(origial_value == splitVal[i]){
													selected = "selected='selected'";
												}else{
													selected="";
												}
												createInput += '<option value="'+splitVal[i]+'" '+selected+'>'+splitVal[i]+'</option>';
											}
										}
										expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<select id="'+roweId+'" class="editable-text showHiddenValue select" style="display:none;width:30%;" column-no="'+$(this).attr("data-column-no")+'" name="'+colName+'" >'+createInput+'</select>');
								}else{
									expandedDiv.find(".clickToEdit").parents(".expand-contents").append('<textarea class="editable-text showHiddenValue animated-textarea" style="display:none;width:100%;"></textarea>');
									expandedDiv.find(".editable-text").text(origial_value);
								}
									expandedDiv.find(".editable-text").attr("id",roweId);
								}else{
									expandedDiv.find(".editable-text").remove();
									expandedDiv.find("span").removeClass("clickToEdit");
								}
								$(".toggle-plus-div td").attr({
										"colspan":$(getParent).children("td").length,
									});
									if(roweId == rowCheck ){
										$(expandedDiv).appendTo("#div-"+rowCheck+" .addContent");
										$("#div-"+rowCheck).next("#div-"+rowCheck).remove();
									}	
							});
						}else if($( window ).width() > 980){
							$(".toggle-plus-div").remove();
						}
					}
					IsEditableExpandContent();
				});
			},
			addValidationClass : function(datatype){
				if(datatype == "N"){
					setClass = "numbersOnly";
				}else if(datatype == "UA"){
					setClass = "lettersOnly";
				}else if(datatype == "S"){
					setClass = "SpecialCharacterOnly";
				}else if(datatype == "UAN"){
					setClass = "alphaNumericOnly";
				}else if(datatype == "UANS"){
					setClass = "alphaNumericAndSpecialCharOnly";
				}
				return setClass;
			},
			json_parse : function(data){
				var obj = jQuery.parseJSON(data);
				return obj;
			},
			checkWidth : function(){
				if($( window ).width() < 768 && $( window ).width() > 360){
					$( ".heading th:gt(3)" ).each(function(){
						var column_no = $(this).attr("data-column-id");
						$( ".rowModels td[data-column-no="+column_no+"]" ).hide();
						$(this).hide();
						$(".child-tree-link").addClass("mobile_view_toggle");
					});
				}else if($( window ).width() <= 360){
					$( ".heading th:gt(2)" ).each(function(){
						var column_no = $(this).attr("data-column-id");
						$( ".rowModels td[data-column-no="+column_no+"]" ).hide();
						$(this).hide();
						$(".child-tree-link").addClass("mobile_view_toggle");
					});
				}else if($( window ).width() >= 768 && $( window ).width() < 980){
					$( ".heading th:gt(4)" ).each(function(){
						var column_no = $(this).attr("data-column-id");
						$( ".rowModels td[data-column-no="+column_no+"]" ).hide();
						$(this).hide();
						$(".child-tree-link").removeClass("mobile_view_toggle");
					});
				}else if($( window ).width() > 980){
					$( ".heading th:gt(1)" ).each(function(){
						var column_no = $(this).attr("data-column-id");
						$( ".rowModels td[data-column-no="+column_no+"]" ).show();
						$(this).show();
						$(".child-tree-link").removeClass("mobile_view_toggle");
					});
				}
			},
			changePage : function(){
				    var prevSelect = $('.page_no_select').val();
				    var prevRecordSelect = $('.records_select').val();
				   
				$(".page_no_select,.records_select").change(function(){	
					var updated = 0;
					if(triggerPrompt == 0){
						
							if(changeClass == 1){
								var ans = confirm("You have unsaved data, do you want to proceed without saving ?");
								if(ans){
									updated = 0;
									changeClass = 0;
								}else{
									updated = 1;
									$(".page_no_select option[value="+prevSelect+"]").bind("focus");
									$(".page_no_select option[value="+prevSelect+"]").attr("selected","selected");
									$(".page_no_select option[value="+prevSelect+"]").prop("selected", true);
									$(".records_select option[value="+prevRecordSelect+"]").bind("focus");
									$(".records_select option[value="+prevRecordSelect+"]").attr("selected","selected");
									$(".records_select option[value="+prevRecordSelect+"]").prop("selected", true);	
								}
							}
					}
					if(updated == 0){
						if($(this).attr("id") == "pageNo"){
							 page_no = $(this).val();
							 page_record = $(".records_select option:selected").val();
						}else{
							 page_no =$(".page_no_select option:selected").val();
							 page_record = $(this).val();
						}
						var nodeId  = $(".hiddenNodeId_add").val();
						var ajaxUrl = "tableMaintenance/pageDetail";
						$.ajax({
								url: ajaxUrl,
								dataType: "json",
								type: 'POST',
								data:{nodeIdinput:nodeId,pageNo:page_no,recPerPage:page_record},
								crossDomain: true,
								cache:false,
						   error: function(data,status,error) {
							ajaxLoaderStop();
						   },
						   success: function(data) {
							  
							 ajaxLoaderStop();
							 if(data.isError == 0){
									var object = data.returnObject;
									 methods.addRows(object.recordData);
									 methods.buildPagination(object);
									 methods.changePage();
									 methods.checkWidth();
									 methods.expandContent();
									 isEditableCheck();
							   	}
							 else if (data.isError == 2) {
									alert(data.errorMessage);
									window.location.href = setWebUrl;
								} 
							 else{
							   		fireErrorMessage(data.errorMessage);
							   	}
						   }
						});
					}
					
				});
			},
			changeSortOrder : function(){
				$(".sorting").click(function(){
					var sortOrder_data = $(this).attr("default-sort-order");
					var column_name = $(this).attr("data-column-name");
					var nodeId  = $(".hiddenNodeId_add").val();
					var newSortOrder;
					if(sortOrder_data.toLowerCase() == "null"){
						newSortOrder = "ASC";
						$(this).addClass("sorting_asc");
					}
					if(sortOrder_data == "ASC"){
						newSortOrder = "DESC";
						$(this).removeClass("sorting_asc");
						$(this).addClass("sorting_des");
					}
					if(sortOrder_data == "DESC"){
						newSortOrder = "Null";
						$(this).removeClass("sorting_des");
					}
					$(this).attr("default-sort-order",newSortOrder);
				
					$(".heading th[data-column-name !="+column_name+"]").attr("default-sort-order","Null");
					$(".heading th[data-column-name !="+column_name+"]").addClass("sorting");
					$(".heading th[data-column-name !="+column_name+"]").removeClass("sorting_asc sorting_des");
					var ajaxUrl = "tableMaintenance/sort";
					$.ajax({
							url: ajaxUrl,
							dataType: "json",
							type: 'POST',
							cache:false,
							data:{nodeIdinput:nodeId,columnName:column_name,sortOrder:newSortOrder},
							crossDomain: true,
								error : function(data, status, error) {
									ajaxLoaderStop();
								},
								success : function(data) {
									ajaxLoaderStop();
									if (data.isError == 0) {
										var object = data.returnObject;
										methods.addRows(object.recordData);
										isEditableCheck();
										methods.checkWidth();
										methods.expandContent();
									} else if (data.isError == 2) {
										alert(data.errorMessage);
										window.location.href = setWebUrl;
									} else {
										fireErrorMessage(data.errorMessage);
									}

								}
							});
						});
			},
			clickPaginationLink : function(){
				$(".btn-sm").click(function(){
					var updated = 0;
					$(".rowModels").each(function(){
						//$(".rowModels").find("td").css("backgroundColor") == "rgb(183, 218, 206)"
						if(changeClass == 1 ){
							var ans = confirm("You have unsaved data, do you want to proceed without saving ?");
							if(ans){
								triggerPrompt = 1;
								updated = 0;
								changeClass = 0;
							}else{
								updated = 1;
							}
							return false;
						}				
					});
					if(updated == 0){
						var rel;
						if($(this).hasClass("next")){
							rel = parseInt($(".page_no_select option:selected").val()) + 1;
						}else{
							rel = parseInt($(".page_no_select option:selected").val()) - 1;
						}
						if(rel <= defaults.totalPages){
							$(".page_no_select").find('option').removeAttr("selected");
							$(".page_no_select option[value="+rel+"]").attr("selected","selected");
							$(".page_no_select option[value="+rel+"]").trigger("change");
						}
					}
				});
			},
			filterData : function(valueCheck){
				$(".filterSearch").click(function(){
					var nodeId = $(".hiddenNodeId_add").val();
					 var col = [];
					 var item = [];
					$(".search-criteria .filed1").each(function(){
							 var inputVal = $(this).find(".selectdiv input").val();
							 var fc = $(this).find(".dataValueName").val();
							 var fo = $(this).find(".currentFilter_ope option:selected").val();
							 var fv = (inputVal != undefined)?$(this).find(".selectdiv input").val():$(this).find(".possible_values").val();
							 var fs = $(this).find(".radioBtns input[type='radio']:checked").val();
						 item = {filterColumnName:fc, filterOperator:fo ,filterValue:fv , filterStatus:fs };
						 col.push(item);
					});
					var myString = JSON.stringify(col);
					 $.ajax({
						type: "POST",
						url: "tableMaintenance/filter",
						data : {
							nodeIdinput : nodeId,
							filterDetail : myString //json String of List of clumn details
						},
						cache:false,
						success: function(data) {
							ajaxLoaderStop();
							if(data.isError == 0){
								var object = data.returnObject;
								 methods.buildPagination(object);
								 methods.addRows(object.recordData);
								 methods.changePage();
								 methods.checkWidth();
								 methods.expandContent();
								isEditableCheck();
						   	}
							else if (data.isError == 2) {
								alert(data.errorMessage);
								window.location.href = setWebUrl;
							} 
							else {
						   		fireErrorMessage(data.errorMessage);
						   	}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							
						   console.log(jqXHR + " : " + textStatus + " : " + errorThrown);
						   
						  
						}
					});
				});
			},
			addSearchCriteria : function(){
				$("#search_add_more").change(function(){
					if($(this).val() != "")
					{
						var optionVal = $(this).val();
						var textVal = $("#search_add_more option[value='"+optionVal+"']").text();
						var dataValueName = $("#search_add_more option[value='"+optionVal+"']").attr("data-value-name");
						getSearchMoreHTML(textVal,optionVal,dataValueName);
						$("#search_add_more option[value='"+optionVal+"']").remove();
					}
				});
			},
			checkAllCheckBox : function(){
				$(".css-checkbox-all").click(function(){
					 $(".rowModels input[type='checkbox']").each(function(){
						 if($(".css-checkbox-all").prop("checked") == true){
							 $( ".rowModels input[type='checkbox']" ).prop( "checked", true );
							 $(".rowModels input[type='checkbox']").attr("checked","checked");
						 }else{
							 $( ".rowModels input[type='checkbox']" ).prop( "checked", false );
						 }
					 });
				 });
				$(".css-checkbox").click(function(){
					if($(this).prop("checked") == false){
						$(".css-checkbox-all").removeAttr("checked");
					}
				});
			},
			filterObjects : function(filterData){
				var filter_data = filterData.filterColumns;
				for(var i=0;i<filter_data.length;i++){
					if(filter_data[i].filterValue != ""){
						var serachHTML = $(addMoreSearcCriteriaContainer);
						$(".serch-filed-sec .search-criteria").append(serachHTML);
						var column_name = $(".heading th[data-column-name="+filter_data[i].filterColumnName+"]").text();
						var column_no = $(".heading th[data-column-name="+filter_data[i].filterColumnName+"]").attr("data-column-id");
						$("#search_add_more option[value='"+column_no+"']").remove();
						serachHTML.find(".searchValue").text(column_name);
						serachHTML.find(".dataValueName").attr("value",filter_data[i].filterColumnName);
						var ToLowerText = filter_data[i].filterColumnName.toLowerCase(); 
						serachHTML.find(".selectdiv input").attr({"name":ToLowerText,"value":filter_data[i].filterValue});
						serachHTML.find(".radioBtns .radioYes input").attr({
							"id":ToLowerText+"yes",
							"name":ToLowerText
						});
						serachHTML.find(".radioBtns .radioNo input").attr({
							"id":ToLowerText+"no",
							"name":ToLowerText
						});
						serachHTML.find(".radioBtns .radioYes label").attr({
							"for":ToLowerText+"yes"
						});
						serachHTML.find(".radioBtns .radioNo label").attr({
							"for":ToLowerText+"no"
						});
						serachHTML.find(".delete-filter-field a").attr({
							"id" : ToLowerText,
							"class" : "delete-filter"
						});
						serachHTML.find(".currentFilter_ope option[value='"+filter_data[i].filterOperator+"']").attr('selected','selected');
						if(filter_data[i].filterStatus == "1"){
							serachHTML.find(".radioBtns input[id='"+ToLowerText+"yes']").attr('checked','checked');
						}else if(filter_data[i].filterStatus == "0"){
							serachHTML.find(".radioBtns input[id='"+ToLowerText+"no']").attr('checked','checked');
						}
					}
				}
			},
			init : function(){
				$(".reset-data").html("");
				$(".reset-data_pagination").html("");
				$(".page-header").html("");
				if($("#side-menu .folderItemChild a").hasClass("mobile_view_toggle")){
					$("#side-menu").slideUp("slow");
				}
				loadScript(setWebUrl+"/view/gridview.js", function(){
					methods.addGrid(defaults.columns);
				});
				loadScript(setWebUrl+"/view/header.js", function(){
					methods.addMoreFields(defaults.columns);
				});
			}
		};
		return methods.init();
	};
})(jQuery);