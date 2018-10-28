function SensoManSensorHistory(context, currentToken, variables){
	var singletonContextManager = ContextManagerSingleton.getInstance(context,["SensoManSensorHistory"]);
	var RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/historySensor.php';

		$.ajax({
        type:"post",
        url: RestfulServiceURL,
        data:  {token: currentToken, sensorID: variables[0].sensorID},
        success: function(result){
				var response=result;
                singletonContextManager.cmContextVariables[context] = response;
                document.dispatchEvent(singletonContextManager.contextEvents["SensoManSensorHistoryContextValueEvent"]);
                console.log( "SensoManSensorHistory is fired -> Requested SensoManSensorHistory is returned: SensoManSensorHistory!" );

        },
        error: function(){
            console.log("SensoMan occured an error");
        }
    });
		
}