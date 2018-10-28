// LinkedIn fields: https://developer.linkedin.com/docs/fields/basic-profile
function LinkedInInformation(data) {
	var singletonContextManager = ContextManagerSingleton.getInstance("linkedInInfo", ["linkedInInfo"]);
	  
	IN.API.Profile("me")
		.fields(data)
		.result(function(result) {
			if (result.values.length > 0) {
				
				for (i=0;i<data.length;i++){
				 var data_next = data[i];
				 if (data_next == "first-name")
					 data[i] = "firstName";
				 else if(data_next == "last-name")
					 data[i] = "lastName";
				 else if(data_next == "picture-url")
					 data[i] = "pictureUrl";
				 console.log("data_next: " + data_next);
				}
				
				//console.log("data length: " + JSON.stringify(data));
				
				var profile = [];
				
			 for (i=0;i<data.length;i++){
				 var data_next = data[i];
					profile[data_next] = result.values[0][data_next];
					console.log(data_next + ": " + profile[data_next]);
			}
				singletonContextManager.cmContextVariables["linkedInInfo"] = profile;
				document.dispatchEvent(singletonContextManager.contextEvents["linkedInInfoContextValueEvent"]);
				console.log( "LinkedinInformation is fired -> Requested LinkedinInformation is returned: profile." );
			} else {
				singletonContextManager.cmContextVariables["linkedInInfo"] = NULL;
				document.dispatchEvent(singletonContextManager.contextEvents["linkedInInfoContextValueEvent"]);
				console.log( "LinkedinInformation is fired -> Requested LinkedinInformation is returned: null." );
			}
			  
			console.log("THE RESULT: " + result);
		})
		.error(function(err) {
			alert(err);
		});
}