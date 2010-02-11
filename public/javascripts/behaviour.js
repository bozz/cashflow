$(document).ready(function() {

	oTable = $('#data-table').dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bAutoWidth": false,
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "transactions",
		"iDisplayLength": 25,
		"aaSorting": [[1, 'desc']] // initialy sort by date
	});
	
});