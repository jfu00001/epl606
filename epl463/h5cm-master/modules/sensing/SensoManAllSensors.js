function SensoManAllSensors(context, currentToken, variables){
	var singletonContextManager = ContextManagerSingleton.getInstance(context,["SensoManAllSensors"]);
	var RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/all.php';

		$.ajax({
        type:"post",
        url: RestfulServiceURL,
        data:  {token: currentToken},
        success: function(result){
				var response=result;
                singletonContextManager.cmContextVariables[context] = response;
                document.dispatchEvent(singletonContextManager.contextEvents["SensoManAllSensorsContextValueEvent"]);
                console.log( "SensoManAllSensors is fired -> Requested SensoManAllSensors is returned: SensoManAllSensors!" );

        },
        error: function(){
            console.log("SensoMan occured an error");
        }
    });
		
}
