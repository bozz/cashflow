
// create global namespace 
CF = {}


CF.initializeDataTable = function(config) {
	oTable = $(config.tableSelector).dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bAutoWidth": false,
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": "transactions",
		"iDisplayLength": 25,
		"aaSorting": [[1, 'desc']], // initialy sort by date
		"aoColumns": [
			null, null, null, null, null,
			{ 
				"fnRender": function(oObj) {
					return "<a href='transactions/" + oObj.aData[5] + "'>Show</a>"
				}
			},{ 
				"fnRender": function(oObj) {
					return "<a href='transactions/" + oObj.aData[6] + "/edit'>Edit</a>"
				} 
			},{ 
				"fnRender": function(oObj) {
					/*
					if (confirm('Are you sure?')) { 
						var f = document.createElement('form'); 
						f.style.display = 'none'; 
						this.parentNode.appendChild(f); 
						f.method = 'POST'; 
						f.action = this.href;
						var m = document.createElement('input'); 
						m.setAttribute('type', 'hidden');
						m.setAttribute('name', '_method');
						m.setAttribute('value', 'delete'); 
						f.appendChild(m);
						var s = document.createElement('input'); 
						s.setAttribute('type', 'hidden'); 
						s.setAttribute('name', 'authenticity_token'); 
						s.setAttribute('value', 'SS0ovOJtV1rBOFW5Jqd+YQhNO8Dx2V7FbkZoAkzr6RA='); 
						f.appendChild(s);
						f.submit(); 
					};
					*/
					return "<a class='destroy' href='transactions/" + oObj.aData[7] + "'>Destroy</a>"
				} 
			}
		], 
		"fnDrawCallback": function() {
			//console.log("drawCallback");
			
			$("a.destroy").click(function(){
				var urlSegs = $(this).attr('href').split("/");
				var id = (urlSegs.length > 1) ? urlSegs[1] : null;

				console.log("destroy transaction with id: ", id);
				return false;
			});
			
		}
	});

}