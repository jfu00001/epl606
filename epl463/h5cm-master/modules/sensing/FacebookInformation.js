// Facebook public_profile (Default): https://developers.facebook.com/docs/facebook-login/permissions/v2.3
function FacebookInformation(data) {
	
		var singletonContextManager = ContextManagerSingleton.getInstance("facebookInfo", ["facebookInfo"]);
		
		  // Here we run the Graph API after login is successful. 
		  // This testAPI() function is only called in those cases. 
			//console.log('Welcome!  Fetching your information.... ');
			FB.api('/me', function(response) {
			var profile = [];	
			 for (i=0;i<data.length;i++){
				 var data_next = data[i];
				 profile[data_next] = response[data_next];
			}

			  singletonContextManager.cmContextVariables["facebookInfo"] = profile;
			  document.dispatchEvent(singletonContextManager.contextEvents["facebookInfoContextValueEvent"]);
			  console.log( "FacebookInformation is fired -> Requested FacebookInformation is returned." );
			});
			
	}
