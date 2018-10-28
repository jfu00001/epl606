// first thing is to get the Singleton instance of the ContextManager
var cms = ContextManagerSingleton.getInstance("application", ["application"]);

// define the scripts to be loaded
var scriptsURL = 
	new Array(
			  "h5cm-master/modules/sensing/GPSCoordinates.js",
			  "h5cm-master/modules/sensing/NetworkStatus.js",
			  "h5cm-master/modules/sensing/RestfulService.js"
			);
						   					   
// Load scripts using Promises with jQuery getScript() and wait until all dependencies are loaded
 loadDependencies(scriptsURL);

// this function will be called when the promises (all dependencies) are done loading 
function dependenciesLoaded(){
	initCAWApp();
};

	 function initCAWApp(){
		//NetworkStatus**
		NetworkStatus();
		document.getElementById("networkStatus").innerHTML = cms.cmContextVariables["networkStatus"];
		//**NetworkStatus
		
		//GPSCoordinates**	// to call the GPSCoordinates module 
		GPSCoordinates();
		// Listen for the gpsCoordinatesContextValueEvent
		document.addEventListener('gpsCoordinatesContextValueEvent', function (e1) { 
		document.getElementById("gpsCoordinates").innerHTML = 
							"Latitude: " + cms.cmContextVariables["gpsLatitude"] + 
							" Longitude: " + cms.cmContextVariables["gpsLongitude"];
	
		document.getElementById("lat").value = cms.cmContextVariables["gpsLatitude"];
		document.getElementById("lng").value = cms.cmContextVariables["gpsLongitude"];		
		}, false);
		//**GPSCoordinates

		//weather**
		weather();
		//**weather
	}