
function DeviceOrientation() {
			var singletonContextManager = ContextManagerSingleton.getInstance("deviceOrientation", ["do_direction", "do_tiltLR", "do_tiltFB"]);
			 
        if (window.DeviceOrientationEvent) {
					console.log( "DeviceOrientation is fired -> Requested DeviceOrientation is returned." );
					// Listen for the deviceorientation event and handle the raw data
					window.addEventListener('deviceorientation', function(eventData) {
						// gamma is the left-to-right tilt in degrees, where right is positive
						var tiltLR = eventData.gamma;
						// beta is the front-to-back tilt in degrees, where front is positive
						var tiltFB = eventData.beta;
						// alpha is the compass direction the device is facing in degrees
						var direction = eventData.alpha;
						
						if (tiltLR == undefined || tiltFB == undefined || direction == null){
							singletonContextManager.cmContextVariables["do_direction"] = "No such hardware exists!";
							singletonContextManager.cmContextVariables["do_tiltLR"] = "No such hardware exists!";
							singletonContextManager.cmContextVariables["do_tiltFB"] = "No such hardware exists!";
							document.dispatchEvent(singletonContextManager.contextEvents["deviceOrientationContextValueEvent"]);
							console.log( "DeviceOrientation: No such hardware exists!");
						}
						else{// changing and dispatching events here works
							singletonContextManager.cmContextVariables["do_direction"] = direction;
							singletonContextManager.cmContextVariables["do_tiltLR"] = tiltLR;
							singletonContextManager.cmContextVariables["do_tiltFB"] = tiltFB;
							document.dispatchEvent(singletonContextManager.contextEvents["deviceOrientationContextValueEvent"]);
							console.log( "DeviceOrientation is fired -> Requested DeviceOrientation is returned." );
						}
					}, false);
					
		}  
			/** Warning: This experimental API was removed in Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3), 
			 ** when support for the standard DeviceOrientationEvent was implemented. You should use that API instead.
			else if (window.OrientationEvent) {
				window.addEventListener('MozOrientation', function(eventData) {
					
					// x is the left-to-right tilt from -1 to +1, so we need to convert to degress
					var tiltLR = eventData.x * 90;

					// y is the front-to-back tilt from -1 to +1, so we need to convert to degress
					// We also need to invert the value so tilting the device towards us (forward) 
					// results in a positive value. 
					var tiltFB = eventData.y * -90;
					
					// MozOrientation does not provide this data
					var direction = null;

					// changing and dispatching events here works
					singletonContextManager.cmContextVariables["do_direction"] = direction;
					singletonContextManager.cmContextVariables["dm_tiltLR"] = tiltLR;
					singletonContextManager.cmContextVariables["dm_tiltFB"] = tiltFB;
					document.dispatchEvent(singletonContextManager.contextEvents["deviceOrientationContextValueEvent"]);
					console.log( "DeviceOrientation (MozOrientation) is fired -> Requested DeviceOrientation is returned." );
					
					}, false);

			}**/ 
		else {
				singletonContextManager.cmContextVariables["do_direction"] = "Not supported on your browser.";
				singletonContextManager.cmContextVariables["do_tiltLR"] = "Not supported on your browser.";
				singletonContextManager.cmContextVariables["do_tiltFB"] = "Not supported on your browser.";
				document.dispatchEvent(singletonContextManager.contextEvents["deviceOrientationContextValueEvent"]);
    			console.log( "DeviceOrientation: The API is not supported on your browser!");
	   	}	   
	   		
}