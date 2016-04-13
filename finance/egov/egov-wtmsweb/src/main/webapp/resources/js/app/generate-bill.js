/*#-------------------------------------------------------------------------------
# eGov suite of products aim to improve the internal efficiency,transparency, 
#    accountability and the service delivery of the government  organizations.
# 
#     Copyright (C) <2015>  eGovernments Foundation
# 
#     The updated version of eGov suite of products as by eGovernments Foundation 
#     is available at http://www.egovernments.org
# 
#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     any later version.
# 
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
# 
#     You should have received a copy of the GNU General Public License
#     along with this program. If not, see http://www.gnu.org/licenses/ or 
#     http://www.gnu.org/licenses/gpl.html .
# 
#     In addition to the terms of the GPL license to be adhered to in using this
#     program, the following additional terms are to be complied with:
# 
# 	1) All versions of this program, verbatim or modified must carry this 
# 	   Legal Notice.
# 
# 	2) Any misrepresentation of the origin of the material is prohibited. It 
# 	   is required that all modified versions of this material be marked in 
# 	   reasonable ways as different from the original version.
# 
# 	3) This license does not grant any rights to any user of the program 
# 	   with regards to rights under trademark law for use of the trade names 
# 	   or trademarks of eGovernments Foundation.
# 
#   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
#-------------------------------------------------------------------------------*/
jQuery(document).ready(function() {

	$('#report-footer').hide();
	jQuery('#searchid').click(function(e) {
		
		loadingReport();
	});
	
});

function loadingReport()
{
		if($('form').valid()){
			alert("here");
			var zone = $("#zone").val();
			var revenueWard = $("#revenueWard").val(); 
			var propertyType = $("#propertyType").val();
			var applicationType = $("#applicationType").val();
			
			
			var consumerCode = $("#consumerCode").val();
			var assessmentNumber = $("#assessmentNumber").val();
			var houseNumber = $("#houseNumber").val();
			var today = getdate();
			var connectionType = $("#connectionType").val();
			
			alert("revenueWard-->"+revenueWard);
			alert("applicationType-->"+applicationType);
			alert("consumerCode-->"+consumerCode);
			alert("assessmentNumber-->"+assessmentNumber);
			alert("houseNumber-->"+houseNumber);
			alert("connectionType-->"+connectionType);

			oTable= $('#generateBill-table');
			alert("here2");
			var oDataTable=oTable.dataTable({
				"sPaginationType": "bootstrap",
				"sDom": "<'row'<'col-xs-12 hidden col-right'f>r>t<'row'<'col-md-3 col-xs-12'i><'col-md-3 col-xs-6 col-right'l><'col-xs-12 col-md-3 col-right'<'export-data'T>><'col-md-3 col-xs-6 text-right'p>>",
				"aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"autoWidth": false,
				"bDestroy": true,
				"oTableTools" : {
					"sSwfPath" : "../../../../../../egi/resources/global/swf/copy_csv_xls_pdf.swf",
				},
				ajax : {
					url : "/wtms/report/generateBill/search/result",
					data : {
						'consumerCode': consumerCode,
						'zone': zone,
						'revenueWard':revenueWard,
						'propertyType' :propertyType,
						'applicationType': applicationType,
						'connectionType': connectionType,
						'consumerCode': consumerCode,
						'houseNumber': houseNumber,
						'assessmentNumber': assessmentNumber
					}
				},
				"columns" : [
							  { "data" : "hscNo" , "title": "H.S.C NO"},  
							  { "data" : "ownerName", "title": "Owner Name"},
							  { "data" : "propertyId", "title": "Property Id"},
							  { "data" : "billNo", "title": "Bill No"},
							  { "data" : "billDate", "title": "Bill Date"},
							  { "data" : "houseNo", "title": "House No"},
							  { "data" : "locality", "title": "Locality"},
							  { "data" : "connectionType", "title": "Connection Type"}
							
							],
							  "footerCallback" : function(row, data, start, end, display) {
									var api = this.api(), data;
									if (data.length == 0) {
										jQuery('#report-footer').hide();
									} else {
										jQuery('#report-footer').show(); 
									}
									
								},
					            "fnInitComplete": function() {
					            	if(oDataTable){ oDataTable.fnSort( [ [7,'desc'] , [3,'asc'] ] ); }
					            },
					            "fnDrawCallback": function ( oSettings ) {
					                /* Need to redo the counters if filtered or sorted */
					                if ( oSettings.bSorted || oSettings.bFiltered )
					                {
					                    for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )
					                    {
					                        $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+1 );
					                    }
					                }
					            },
					            
								"aoColumnDefs" : [ {
								
									"mRender" : function(data, type, full) {
										return formatNumberInr(data);    
									}
								} ]		
					});
			
			
			e.stopPropagation();
		}
		
		function updateSerialNo()
		{
			$( "#generateBill-table tbody tr" ).each(function(index) {
				if($(this).find('td').length>1)
				{
					oDataTable.fnUpdate(''+(index+1), index, 0);
				}
			});
			
		}
		
	
}

function formatNumberInr(x) {
	if (x) {
		x = x.toString();
		var afterPoint = '';
		if (x.indexOf('.') > 0)
			afterPoint = x.substring(x.indexOf('.'), x.length);
		x = Math.floor(x);
		x = x.toString();
		var lastThree = x.substring(x.length - 3);
		var otherNumbers = x.substring(0, x.length - 3);
		if (otherNumbers != '')
			lastThree = ',' + lastThree;
		var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
				+ lastThree + afterPoint;
		return res;
	}
	return x;
}
function getdate()
{
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}
function updateTotalFooter(colidx, api) {
	// Remove the formatting to get integer data for summation
	var intVal = function(i) {
		return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1
				: typeof i === 'number' ? i : 0;
	};

	// Total over all pages
	total = api.column(colidx).data().reduce(function(a, b) {
		return intVal(a) + intVal(b);
	});

	// Total over this page
	pageTotal = api.column(colidx, {
		page : 'current'
	}).data().reduce(function(a, b) {
		return intVal(a) + intVal(b);
	}, 0);

	// Update footer
	jQuery(api.column(colidx).footer()).html(
			formatNumberInr(pageTotal) + ' (' + formatNumberInr(total)
					+ ')');
}