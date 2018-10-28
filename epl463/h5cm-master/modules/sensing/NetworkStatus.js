
function NetworkStatus() {
	   var singletonContextManager = ContextManagerSingleton.getInstance("networkStatus", ["networkStatus"]);
		
	   if (navigator.onLine) {
		    singletonContextManager.cmContextVariables["networkStatus"] = "ONLINE.";
			document.dispatchEvent(singletonContextManager.contextEvents["networkStatusContextValueEvent"]);
			console.log( "NetworkStatus is fired -> Requested NetworkStatus is returned: ONLINE." );
	   }
	   else if (navigator.onLine == undefined){
		    singletonContextManager.cmContextVariables["networkStatus"] = "Network API not available.";
			document.dispatchEvent(singletonContextManager.contextEvents["networkStatusContextValueEvent"]);
			console.log( "NetworkStatus is fired -> Requested NetworkStatus is returned: Network API not available!" );
 
	   }	   
	    else {
			singletonContextManager.cmContextVariables["networkStatus"] = "OFFLINE.";
			document.dispatchEvent(singletonContextManager.contextEvents["networkStatusContextValueEvent"]);
			console.log( "NetworkStatus is fired -> Requested NetworkStatus is returned: OFFLINE." );
	   }

}