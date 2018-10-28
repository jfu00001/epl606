// cut off value for the battery (e.g., if higher show information via gui (e.g., map), 
// otherwise display text (e.g., text based navigation instructions))
// status = TRUE OR FALSE
function BatteryAnalyser(batteryLevel, batteryLevelCutoff) {
	
	var singletonContextManager = ContextManagerSingleton.getInstance("batteryAnalyser", ["batteryAnalyser"]);
	
	if (batteryLevel != undefined) {
	
		var level = parseInt(batteryLevel);
		
		if (batteryLevel>=batteryLevelCutoff) {
			// We're just going to simulate a 3-second delay since it takes some time
			// to get the battery information and fire the event when requested the first time
			var timer = setTimeout(function () {
				singletonContextManager.cmContextVariables["batteryAnalyser"] = "TRUE";
				document.dispatchEvent(singletonContextManager.contextEvents["batteryAnalyserContextValueEvent"]);
				console.log( "BatteryAnalyser is fired -> Requested BatteryAnalyser is returned: TRUE." );
			}, 100);
		}
		else if (batteryLevel<batteryLevelCutoff) {
			// We're just going to simulate a 3-second delay since it takes some time
			// to get the battery information and fire the event when requested the first time
			var timer = setTimeout(function () {
				singletonContextManager.cmContextVariables["batteryAnalyser"] = "FALSE";
				document.dispatchEvent(singletonContextManager.contextEvents["batteryAnalyserContextValueEvent"]);
				console.log( "BatteryAnalyser is fired -> Requested BatteryAnalyser is returned: FALSE." );
			}, 100);

		}
	}
	else{
		// We're just going to simulate a 3-second delay since it takes some time
		// to get the battery information and fire the event when requested the first time
		var timer = setTimeout(function () {
			singletonContextManager.cmContextVariables["batteryAnalyser"] = "Not supported on your device or browser.";
			document.dispatchEvent(singletonContextManager.contextEvents["batteryAnalyserContextValueEvent"]);
			console.log( "BatteryAnalyser: first time request is fired -> Not supported on your device or browser." );
		}, 100);
	}

}