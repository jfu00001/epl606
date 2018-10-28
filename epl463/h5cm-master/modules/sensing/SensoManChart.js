function SensoManChart(context, currentToken, variables){
	var singletonContextManager = ContextManagerSingleton.getInstance(context, 
								  ["sensorNames", "sensorTypes", "sensorMeasurements", "unitsNames", "unitsSymbols"]);
								  
	var RestfulServiceURL = 'http://thesis.in.cs.ucy.ac.cy/datasensors/retrieve/measurementsType.php';
	var sensorsIndex = 0;
	for (var i=0;i < variables.length; i++){
		(function(i){
		$.ajax({
			type:"post",
			url: RestfulServiceURL,
			data: {token: currentToken, sensorType: variables[i].sensorType},
			success: function(result){
					var sensors = result.Sensors;
					// console.log("sensorType: " + variables[i].sensorType);
					// console.log("sensors");
					// console.log(sensors);
					if (sensorsIndex == 0){
						var sensorNames = [];
						var sensorTypes = [];
						var sensorMeasurements = [];
						var unitsNames = [];
						var unitsSymbols = [];
					
						singletonContextManager.cmContextVariables["sensorTypes"] = sensorTypes;
						singletonContextManager.cmContextVariables["sensorNames"] = sensorNames;
						singletonContextManager.cmContextVariables["sensorMeasurements"] = sensorMeasurements;
						singletonContextManager.cmContextVariables["unitsNames"] = unitsNames;
						singletonContextManager.cmContextVariables["unitsSymbols"] = unitsSymbols;
					
					}
					for	(var index = 0; index < sensors.length; index++) {
						 var sensorName=sensors[index].SensorName;
						 var sensorMeasurements =sensors[index].Measurements;
						// console.log("variables[i].sensorType: " + variables[i].sensorType);
						// console.log("variables[i].unitsNames: " + variables[i].unitsName);
						// console.log("variables[i].unitsSymbols: " + variables[i].unitsSymbol);
							
						 (singletonContextManager.cmContextVariables["sensorNames"])[sensorsIndex] = sensorName;
						 (singletonContextManager.cmContextVariables["sensorTypes"])[sensorsIndex] =  variables[i].sensorType;
						 (singletonContextManager.cmContextVariables["sensorMeasurements"])[sensorsIndex] = sensorMeasurements;
						 (singletonContextManager.cmContextVariables["unitsNames"])[sensorsIndex] =  variables[i].unitsName;
						 (singletonContextManager.cmContextVariables["unitsSymbols"])[sensorsIndex] =  variables[i].unitsSymbol;
						 
						 // console.log("index: " + index);
						 // console.log("sensorsIndex: " + sensorsIndex);
						  // console.log("sensorName: " + (singletonContextManager.cmContextVariables["sensorNames"])[sensorsIndex]);
						  // console.log("sensorType: " + (singletonContextManager.cmContextVariables["sensorTypes"])[sensorsIndex]);
						  // console.log( (singletonContextManager.cmContextVariables["sensorMeasurements"])[sensorsIndex]);
						 
						 // console.log((singletonContextManager.cmContextVariables["sensorNames"])[index]);
						 // console.log((singletonContextManager.cmContextVariables["sensorMeasurements"])[index]); 
						sensorsIndex++;
						document.dispatchEvent(singletonContextManager.contextEvents["SensoManChartContextValueEvent"]);
						console.log( "SensoManChart is fired -> Requested SensoManChart is returned: SensoManChart!" );
						console.log(singletonContextManager.cmContextVariables["sensorMeasurements"]);
					}
					
				   
					//console.log("sensorTypes");
					//console.log((singletonContextManager.cmContextVariables["sensorTypes"])[parameters.sensorIndex]);
					//console.log("sensorMeasurements");
					//console.log(singletonContextManager.cmContextVariables["sensorMeasurements"]);

			},
			error: function(){
				console.log("SensoManChart occured an error"); 
			}
		});
		 })(i);
	}
}

function loadGraph(index){
    var categories=[];
    var chartMeasurements=[];
	var sensorMeasurements = (singletonContextManager.cmContextVariables["sensorMeasurements"])[index];
	// console.log("Index: " + index);
	// console.log("sensorMeasurements");
	// console.log(sensorMeasurements);
	// console.log("singleton array sensorMeasurements");
	// console.log(singletonContextManager.cmContextVariables["sensorMeasurements"]);
	
	var sensorType = singletonContextManager.cmContextVariables["sensorTypes"][index];
	var sensorName = singletonContextManager.cmContextVariables["sensorNames"][index];
	var sensorUnitName = singletonContextManager.cmContextVariables["unitsNames"][index];
	var sensorUnitSymbol = singletonContextManager.cmContextVariables["unitsSymbols"][index];
        
			
			if (sensorType == "Temperature" || sensorType == "Sound" || sensorType == "LDR"){
				for (j=0; j<sensorMeasurements.length; j++) {
					var timestamp = sensorMeasurements[j].Timestamp;
					var measurement = parseFloat(sensorMeasurements[j].Measurement);
					// console.log(timestamp);
					// console.log(measurement);
					categories.push(timestamp);
					chartMeasurements.push(measurement);
				}
			}
			else if (sensorType == "Motion"){
				for (j=0; j<sensorMeasurements.length; j++) {
					var catStart = sensorMeasurements[j].TimestampStart;
					var catEnd = sensorMeasurements[j].TimestampEnd;
					categories.push(catStart);
					categories.push("")
					categories.push(catEnd);
					chartMeasurements.push(1);
					chartMeasurements.push(1);
					chartMeasurements.push(1);
					if (j < (sensorMeasurements.length - 1)) {
						var catStartNext = sensorMeasurements[j + 1].TimestampStart;
						categories.push("");
						categories.push("");
						chartMeasurements.push(0);
						chartMeasurements.push(0);
					}
				}
			}
			else if(sensorType == "Humidity"){
				for (j=0; j<sensorMeasurements.length; j++) {
					var cat = sensorMeasurements[j].Timestamp;
					var meas = sensorMeasurements[j].Measurement;
					if (meas=="HIGH"){
						var m=1;
					}
					else{
						var m=0;
					}
					categories.push(cat);
					chartMeasurements.push(m);
				}
			}
        
	
	// console.log(sensorType);
	// console.log(sensorName);

		$(function () {
		
			$('#SensorChart').highcharts({
				chart: {
					type: 'spline'
				},
				title: {
					text: sensorType + ' taken by Sensor'
				},
				xAxis: {
					categories: categories
				},
				yAxis: {
					title: {
						text: sensorUnitName
					},
					labels: {
						formatter: function () {
							return this.value + '' + sensorUnitSymbol;
						}
					}
				},
				tooltip: {
					crosshairs: true,
					shared: true
				},
				plotOptions: {
					spline: {
						marker: {
							radius: 4,
							lineColor: '#666666',
							lineWidth: 1
						} 
					}
				},
				series: [{
						name: sensorName,
						marker: {
							// shape for each data point in the series, e.g., circle, or square
							symbol: 'circle' 
						},
						data: chartMeasurements
                }]
        })})
}
