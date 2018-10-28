function RestfulService(RestfulServiceURL, context){
	
		var singletonContextManager = ContextManagerSingleton.getInstance(context, ["restfulService"]);

		$.ajax({ 
		   type: "GET",
		   dataType: "jsonp",
		   url: RestfulServiceURL,
		   success: function(data){
			 console.log(data);
			 
			 if (context == 'restfulService1'){
					singletonContextManager.cmContextVariables["restfulService1"] = data;
					document.dispatchEvent(singletonContextManager.contextEvents["restfulService1ContextValueEvent"]);
					console.log( "RestfulService is fired -> Requested RestfulService is returned: restfulService1." );
				}
				else if (context == 'restfulService2'){
					singletonContextManager.cmContextVariables["restfulService2"] = data;
					document.dispatchEvent(singletonContextManager.contextEvents["restfulService2ContextValueEvent"]);
					console.log( "RestfulService is fired -> Requested RestfulService is returned: restfulService2." );
				}
				else if (context == 'restfulService3'){
					singletonContextManager.cmContextVariables["restfulService3"] = data;
					document.dispatchEvent(singletonContextManager.contextEvents["restfulService3ContextValueEvent"]);
					console.log( "RestfulService is fired -> Requested RestfulService is returned: restfulService3." );
				}
				else if (context == 'restfulService4'){
					singletonContextManager.cmContextVariables["restfulService4"] = data;
					document.dispatchEvent(singletonContextManager.contextEvents["restfulService4ContextValueEvent"]);
					console.log( "RestfulService is fired -> Requested RestfulService is returned: restfulService4." );
				}
				else if (context == 'restfulService5'){
					singletonContextManager.cmContextVariables["restfulService5"] = data;
					document.dispatchEvent(singletonContextManager.contextEvents["restfulService5ContextValueEvent"]);
					console.log( "RestfulService is fired -> Requested RestfulService is returned: restfulService5." );
				}
			 
		   }
		});
		
}




