/**
 * Created by Stella Constantinou on 1/3/2015.
 */
function SensoManConnect(context, parameters){

    var singletonContextManager = ContextManagerSingleton.getInstance(context, parameters);
		
	//parameters.token = parameters.token.replace('ForwardSlash', '');
	console.log("Parameters: " + JSON.stringify(parameters));
    
	var RestfulServiceURL;
    
	if (context=='SensoManConnect'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/connect.php';
    }
    else if (context=='SensoManLogout'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/logout.php';
    }
    else if(context=='SensoManRegister'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/upload/registration.php';
    }
    else if(context=='SensoManNotify'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/notification.php';
    }
    else if(context=='SensoManFulNotifications'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/upload/fullfill-jobs.php';
    }
    else if(context=='SensoManChart'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/measurementsType.php';
    }
    else if(context=='SensoManController'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/upload/upload_controller.php';
    }
    else if(context=='SensoManCSV'){
        RestfulServiceURL='';
    }
    else if(context=='SensoManML'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/CSVsimpleML.php';
    }
    else if(context=='SensoManSensors'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/sensors.php';
    }
	else if(context=='SensoManAllSensors'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/all.php';
    }
	else if(context=='SensoManSensorHistory'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/historySensor.php';
    }
	else if(context=='SensoManLastTempPi'){
        RestfulServiceURL='http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/lastTempArd.php';
    }
    $.ajax({
        type:"post",
        url: RestfulServiceURL,
        data: parameters,
        success: function(result){
				var response=result;
                singletonContextManager.cmContextVariables[context] = response;
                document.dispatchEvent(singletonContextManager.contextEvents[context+"ContextValueEvent"]);
                console.log( "SensoMan is fired -> Requested SensoMan is returned: " + context );

        },
        error: function(){
            console.log("SensoMan occured an error");
        }
    });

}
