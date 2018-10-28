function SensoManConnect(context, parameters){
    var singletonContextManager = ContextManagerSingleton.getInstance(context, parameters);
	var RestfulServiceURL = 'http://thesis.in.cs.ucy.ac.cy/datasensors/connect.php';
	
    $.ajax({
        type:"post",
        url: RestfulServiceURL,
        data: parameters,
        success: function(result){
				var response=result;
                singletonContextManager.cmContextVariables[context] = response;
                document.dispatchEvent(singletonContextManager.contextEvents[context+"ContextValueEvent"]);
                console.log( "SensoManConnect is fired -> Requested SensoManConnect is returned: " + context );
        },
        error: function(){
            console.log("SensoManConnect occured an error");
        }
    });

}

function logOutFromSensoMan(){
		var RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/logout.php';
		$.ajax({
			type:"post",
			url: RestfulServiceURL,
			data: {token: singletonContextManager.cmContextVariables["SensoManConnect"]},
			success: function(result){
					var response=result;
					singletonContextManager.cmContextVariables["SensoManConnect"] = response;
					document.dispatchEvent(singletonContextManager.contextEvents["SensoManConnectContextValueEvent"]);
					console.log("SensoManConnect is fired -> Requested SensoManConnect is returned: SensoManConnect!");
			},
			error: function(){
				console.log("SensoManConnect occured an error");
			}
		});
	}
