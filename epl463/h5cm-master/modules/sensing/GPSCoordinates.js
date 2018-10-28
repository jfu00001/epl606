function GPSCoordinates() {
console.log("i am here");
		var singletonContextManager = ContextManagerSingleton.getInstance("gpsCoordinates", ["gpsLatitude", "gpsLongitude"]);

		if (navigator.geolocation != undefined) {
		    		      
			navigator.geolocation.getCurrentPosition(showPosition);
		}
		else {
			return "Not supported on your device or browser.";
		}	   
       

		function showPosition(position){
			singletonContextManager.cmContextVariables["gpsLatitude"] = position.coords.latitude;
			singletonContextManager.cmContextVariables["gpsLongitude"] = position.coords.longitude;
			document.dispatchEvent(singletonContextManager.contextEvents["gpsCoordinatesContextValueEvent"]);
			console.log( "GPSCoordinates showPosition is fired -> Requested position is returned." );
		}
		
		
		function monitorPosition(position){	   
			// Log that a newer, perhaps more accurate
			// position has been found.
			// Set the new position of the existing marker.
			singletonContextManager.cmContextVariables["gpsLatitude"] = position.coords.latitude;
			singletonContextManager.cmContextVariables["gpsLongitude"] = position.coords.longitude;
			document.dispatchEvent(singletonContextManager.contextEvents["gpsCoordinatesContextValueEvent"]);
			console.log( "GPSCoordinates monitorPosition is fired -> Requested position is returned." );
		}
		
}


