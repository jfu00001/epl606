// http://stackoverflow.com/questions/11239584/cross-domain-post-method-ajax-call-using-jquery-with-xml-response
// http://cypressnorth.com/programming/cross-domain-ajax-request-with-xml-response-for-iefirefoxchrome-safari-jquery/

function WebService(webServiceURL, context){
	
		var singletonContextManager = ContextManagerSingleton.getInstance(context, ["webService"]);

		for (var i = 0; i < webServiceURL.length; i++) {
			var wsURL;
			
			if (i == 0)
				wsURL = webServiceURL[i] + '?';
			else if(isOdd(i))
				wsURL += webServiceURL[i] + '=';
			else if(!isOdd(i) && i != webServiceURL.length-1)
				wsURL += webServiceURL[i] + '&';
			else if(!isOdd(i) && i == webServiceURL.length-1)
				wsURL += webServiceURL[i];
			 
		}
		
		console.log('the web service url is: ' +wsURL);
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + wsURL + '"') + '&format=json&callback=?';  

		$(function () {
			$(document).ready(function() {
			getval( function ( value ) { 
			
				if (context == 'webService1'){
					singletonContextManager.cmContextVariables["webService1"] = value;
					document.dispatchEvent(singletonContextManager.contextEvents["webService1ContextValueEvent"]);
					console.log( "WebService is fired -> Requested RestfulService is returned: webService1." );
				}
				else if (context == 'webService2'){
					singletonContextManager.cmContextVariables["webService2"] = value;
					document.dispatchEvent(singletonContextManager.contextEvents["webService2ContextValueEvent"]);
					console.log( "WebService is fired -> Requested RestfulService is returned: webService2." );
				}
				else if (context == 'webService3'){
					singletonContextManager.cmContextVariables["webService3"] = value;
					document.dispatchEvent(singletonContextManager.contextEvents["webService3ContextValueEvent"]);
					console.log( "WebService is fired -> Requested RestfulService is returned: webService3." );
				}
				else if (context == 'webService4'){
					singletonContextManager.cmContextVariables["webService4"] = value;
					document.dispatchEvent(singletonContextManager.contextEvents["webService4ContextValueEvent"]);
					console.log( "WebService is fired -> Requested RestfulService is returned: webService4." );
				}
				else if (context == 'webService5'){
					singletonContextManager.cmContextVariables["webService5"] = value;
					document.dispatchEvent(singletonContextManager.contextEvents["webService5ContextValueEvent"]);
					console.log( "WebService is fired -> Requested RestfulService is returned: webService5." );
				}
			} );
			});

		});
		function getval( callback ){
			jQuery.getJSON(yql,function(data){  
				if(data.query.results){
					var output = data.query.results.string.content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
				}
				//console.log(output);
				callback(output);
			});
		}
		
		function isOdd(num) { 
			return num % 2;
		}
		
}