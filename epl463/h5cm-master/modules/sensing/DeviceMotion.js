function DeviceMotion() {
				
				var singletonContextManager = ContextManagerSingleton.getInstance("deviceMotion", ["dm_rawAcceleration", "dm_tiltLR", "dm_tiltFB"]);
				if (window.DeviceMotionEvent) {
				console.log( "DeviceMotion is fired -> Requested DeviceMotion is returned." );
				window.addEventListener('devicemotion', function(eventData) {	
					// Grab the acceleration including gravity from the results
					var acceleration = eventData.accelerationIncludingGravity;

					// Display the raw acceleration data
					var rawAcceleration = "[" + Math.round(acceleration.x) + ", " + 
												Math.round(acceleration.y) + ", " + 
												Math.round(acceleration.z) + "]";

					// Z is the acceleration in the Z axis, and tells us if the device is facing up, or down
					var facingUp = -1;

					if (acceleration.z > 0) {
						facingUp = +1;
					}
					// Convert the value from acceleration to degress
					//   acceleration.x|y is the acceleration according to gravity, we'll assume we're on Earth and divide 
					//   by 9.81 (earth gravity) to get a percentage value, and then multiply that by 90 to convert to degrees.				
					var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
					var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
					
					// changing and dispatching events here works
					singletonContextManager.cmContextVariables["dm_rawAcceleration"] = rawAcceleration;
					singletonContextManager.cmContextVariables["dm_tiltLR"] = tiltLR;
					singletonContextManager.cmContextVariables["dm_tiltFB"] = tiltFB;
					document.dispatchEvent(singletonContextManager.contextEvents["deviceMotionContextValueEvent"]);
					console.log( "DeviceMotion: device motion data are returned!");
				}, false);
			}
			else {
				singletonContextManager.cmContextVariables["dm_rawAcceleration"] = "Not supported on your device or browser.";
				singletonContextManager.cmContextVariables["dm_tiltLR"] = "Not supported on your device or browser.";
				singletonContextManager.cmContextVariables["dm_tiltFB"] = "Not supported on your device or browser.";
				document.dispatchEvent(singletonContextManager.contextEvents["deviceMotionContextValueEvent"]);
    			console.log( "DeviceMotion: The API is not available or no such hardware exists!");
	   		}	   
	   		
	   		//return moAccel;
		
}