// main class ContextAwareApplication

// first thing is to get the Singleton instance of the ContextManager
var cms = ContextManagerSingleton.getInstance("application", ["application"]);


// define the scripts to be loaded
var scriptsURL = 
	new Array("modules/authentication/FacebookConnect.js", "modules/authentication/LinkedInConnect.js",
			  "modules/authentication/SensoManConnect.js", "modules/authentication/GoogleCalendarConnect.js",
			  "modules/sensing/GPSCoordinates.js", "modules/sensing/BatteryLevel.js",
			  "modules/sensing/BatteryIsCharging.js", "modules/sensing/DeviceMotion.js",
			  "modules/sensing/DeviceOrientation.js", "modules/sensing/NetworkStatus.js",
			  "modules/sensing/FacebookInformation.js", "modules/sensing/LinkedInInformation.js",
			  "modules/sensing/WebService.js", "modules/sensing/RestfulService.js",
			  "modules/sensing/DateTime.js", "modules/sensing/GoogleCalendar.js",
			  "modules/sensing/SensoManChart.js", "modules/sensing/SensoManAllSensors.js",
			  "modules/sensing/SensoManSensorHistory.js",
			  "modules/reasoning/BatteryAnalyser.js", "modules/reasoning/FacebookPosts.js");
						   
						   
// Load scripts using Promises with jQuery getScript() 
// and wait until all dependencies are loaded
 loadDependencies(scriptsURL);

// this function will be called when the
// promises (all dependencies) are done loading 
function dependenciesLoaded(){
	initCAWApp();
};

	 function initCAWApp(){
		
		//**GPSCoordinates	// to call the GPSCoordinates module 
		GPSCoordinates();
		
		// Listen for the gpsCoordinatesContextValueEvent
		document.addEventListener('gpsCoordinatesContextValueEvent', function (e1) { 
			document.getElementById("gpsCoordinates").innerHTML = 
							"Latitude: " + cms.cmContextVariables["gpsLatitude"] + 
							" Longitude: " + cms.cmContextVariables["gpsLongitude"];
		}, false);
		//GPSCoordinates**
		
		//**BatteryLevel  // to call the BatteryLevel module
		BatteryLevel();
	
		// Listen for the batteryLevelContextValueEvent
		document.addEventListener('batteryLevelContextValueEvent', function (e2) { 
		
		var bLevel = cms.cmContextVariables["batteryLevel"];
			document.getElementById("batteryLevel").innerHTML = 
							"Battery Level: " + bLevel;
							
			getBatteryLevelAnalysis(bLevel, 60);
		}, false);
		//BatteryLevel**
		
		//**BatteryIsCharging // to call the BatteryIsCharging module
		BatteryIsCharging();
	
		// Listen for the isBatteryChargingContextValueEvent
		document.addEventListener('isBatteryChargingContextValueEvent', function (e3) { 
			document.getElementById("isBatteryCharging").innerHTML = 
							"Is Battery Charging? : " + cms.cmContextVariables["isBatteryCharging"];
		}, false);
		//BatteryIsCharging**
		
		//**DeviceMotion // to call the DeviceMotion module
		DeviceMotion();
	
		// Listen for the deviceMotionContextValueEvent
		document.addEventListener('deviceMotionContextValueEvent', function (e4) { 
			document.getElementById("dm_rawAcceleration").innerHTML = 
							"dm_rawAcceleration: " + cms.cmContextVariables["dm_rawAcceleration"];
			document.getElementById("dm_tiltLR").innerHTML = 
							"dm_tiltLR: " + cms.cmContextVariables["dm_tiltLR"];
			document.getElementById("dm_tiltFB").innerHTML = 
							"dm_tiltFB: " + cms.cmContextVariables["dm_tiltFB"];
		}, false);
		//DeviceMotion**
		
		//**DeviceOrientation // to call the DeviceOrientation module
		DeviceOrientation();
	
		// Listen for the deviceOrientationContextValueEvent
		document.addEventListener('deviceOrientationContextValueEvent', function (e5) { 
			document.getElementById("do_tiltLR").innerHTML = 
							"do_tiltLR: " + cms.cmContextVariables["do_tiltLR"];
			document.getElementById("do_tiltFB").innerHTML = 
							"do_tiltFB: " + cms.cmContextVariables["do_tiltFB"];
			document.getElementById("do_direction").innerHTML = 
							"do_direction: " + cms.cmContextVariables["do_direction"];
		}, false);
		//DeviceOrientation**
		
		//**NetworkStatus
		NetworkStatus();
		document.getElementById("networkStatus").innerHTML = cms.cmContextVariables["networkStatus"];
		//NetworkStatus**
		
		//**FacebookConnect
		$.ajax({ url: '/h5cm/assets/php/io.php',
			 data: {action: 'read', filename: '../social/facebook/properties/FacebookInformation.properties'},
			 type: 'GET',
			 success: function(output) {
				 var lines = output.split('\n');
				 var fb_data = [];
				 
				 for (var i=0; i < lines.length; i++){
					console.log("Properties Line: " + lines[i]);
					fb_data[i] = lines[i];
				 }
				 
				 $.ajax({ url: '/h5cm/assets/php/io.php',
					 data: {action: 'read', filename: '../social/facebook/permissions/FacebookInformation.permissions'},
					 type: 'GET',
					 success: function(output) {
						var lines = output.split('\n');
						var permissions = [];
						for (var i=0; i < lines.length; i++){
							console.log("Permissions Line: " + lines[i]);
							permissions[i] = lines[i];
						}
						
						FacebookConnect(permissions, 'http://localhost/h5cm/assets/fb/channel.html');
						showstuff('fbLogin');
							
						document.addEventListener('facebookConnectContextValueEvent', function (e6) { 
								var fbStatus = cms.cmContextVariables["facebookConnect"];
								if (fbStatus == "user_connected"){
									hidestuff('fbLogin');
									FacebookIsConnected(fb_data);
									showstuff('fbLogout');
								}
								else if (fbStatus == "login_cancelled"){
									alert('Login to use the application.');
								}
								else if (fbStatus == "user_logout"){
									hidestuff('fbLogout');
									showstuff('fbLogin');
								}
						}, false);
					}
				});
			}
		});
		
		//FacebookConnect**
		
		//**LinkedInConnect
		LinkedInConnect();
		showstuff('liLogin');
			
		document.addEventListener('linkedInConnectContextValueEvent', function (e7) { 
				var liStatus = cms.cmContextVariables["linkedInConnect"];
				
				if (liStatus == "user_connected"){
					hidestuff('liLogin');
					LinkedinIsConnected();
					showstuff('liLogout');
				}
				else if (liStatus == "login_cancelled"){
					alert('Login to use the application.');
				}
				else if (liStatus == "user_logout"){
					hidestuff('liLogout');
					showstuff('liLogin');
				}
		}, false);
		//LinkedInConnect**
		
		//**WebService // to get the initial value of the WebService response
		var wsURL = ['http://www.webservicex.net/globalweather.asmx/GetWeather', // web service function URL
						"CityName", "Barcelona", "CountryName", "Spain"]; // web service function parameters
		WebService(wsURL, 'webService1');

		// to handle events when the WebService value changes
		document.addEventListener('webService1ContextValueEvent', function (e8) { 
				var weather = cms.cmContextVariables["webService1"];
				document.getElementById("webService1").innerHTML = weather;
		}, false);
		//WebService**
		
		//**RestfulService // freegeoip.net is a public RESTful web service API for searching geolocation of IP addresses and host names.
		var restfulURL1 = 'http://freegeoip.net/json/';
		RestfulService(restfulURL1, 'restfulService1');
		
		// to handle events when the RESTfulService value changes
		document.addEventListener('restfulService1ContextValueEvent', function (e9) { 
				var location = cms.cmContextVariables["restfulService1"];
				document.getElementById("restfulService1").innerHTML = 'Country Name: ' + location.country_name + ', IP: ' + location.ip;
				callRestfulService2(location.latitude,location.longitude);
		}, false);
		//RestfulService**
		
		//**DateTime
		DateTime();
		document.getElementById("dateTime").innerHTML = cms.cmContextVariables["dateTime"];
		//DateTime**
		
		
	}
	
	//**GoogleCalendarConnect
	function handleGoogleConnect(event){
		GoogleCalendarConnect();
						
						document.addEventListener('googleCalendarConnectContextValueEvent', function (e17) { 
								var googleStatus = cms.cmContextVariables["googleCalendarConnect"];
								if (googleStatus == "user_connected"){
									//**GoogleCalendar
									showstuff('googleCalendar');
									GoogleCalendar();
									
									document.addEventListener('googleCalendarContextValueEvent', function (e18) { 
									var events = cms.cmContextVariables["googleCalendar"];
										if (events.length > 0) {
											for (i = 0; i < events.length; i++) {
											  var event = events[i];
											  var when = event.start.dateTime;
											  if (!when) {
												when = event.start.date;
											  }
											  var message = event.summary + ' (' + when + ')';
											  
											  var pre = document.getElementById('googleCalendarInfo');
											  var textContent = document.createTextNode(message + '\n');
											  pre.appendChild(textContent);
											}
										} else {
											var pre = document.getElementById('googleCalendarInfo');
											var textContent = document.createTextNode('No upcoming events found.');
											pre.appendChild(textContent);
										}

									}, false);
									//GoogleCalendar**
								}
								else {
									alert('Login to Google to use the Calendar application.');
								}

						}, false);
		
	}
	//GoogleCalendarConnect**
	
	
	//**SensoManConnect // to call the SensoManChart sensor module
	function loginSensoMan(){
		
		 var username=document.getElementById("username").value;
		 var password=document.getElementById("password").value;

		var credentials={username:username, password:password};

		SensoManConnect("SensoManConnect", credentials);
		document.addEventListener('SensoManConnectContextValueEvent', function (e10) {
			var response=cms.cmContextVariables["SensoManConnect"];
			if (response.message=="Successfully connected."){
				console.log(response.message);
				var token=response.token;
				singletonContextManager.cmContextVariables["SensoManConnect"] = token;
				hidestuff('sensoManLogin');
				showstuff('sensoManLogout');
				SensoManChartIsConnected(token);
				SensoManAllSensorsIsConnected(token);
				SensoManSensorHistoryIsConnected(token);
			}
			else if (response.message=="Successfully logout"){
				hidestuff('sensoManLogout');
				showstuff('sensoManLogin');
			}
			else{
				alert("Incorrect username and password.");
			}
			$("#username,#password,#login").removeAttr("disabled").val("");
		}, false);
		
	}
	//SensoManConnect**
	
	//**SensoManChart // to call the SensoManChart sensor module
	function SensoManChartIsConnected(currentToken){
		var sensorsIndex = 0;
		// http://www.javascripter.net/faq/mathsymbols.htm
		// Please note that support for plotting a new chart needs to be implemented in SensorManChart.js
		// when a new sensor type needs to be supported.
		SensoManChart("SensoManChart", currentToken, 
					[{sensorType:"Temperature", unitsName:"Celcius", unitsSymbol: '\xB0 C'},
					{sensorType:"Sound", unitsName:"Decibel", unitsSymbol: "dB"},
					{sensorType:"Motion", unitsName:"", unitsSymbol: ""},
					{sensorType:"Humidity", unitsName:"Percentage", unitsSymbol: "%"},
					{sensorType:"LDR", unitsName:"Ohm", unitsSymbol: "\u2126"}]);
		
		// Listen for the facebookPostsContextValueEvent
		document.addEventListener('SensoManChartContextValueEvent', function (e11) { 
			var sensorName = (cms.cmContextVariables["sensorNames"])[sensorsIndex];
			var sensorType = (cms.cmContextVariables["sensorTypes"])[sensorsIndex]; 						
		   $("#SensorsCharts").append('<li role="presentation"><a role="menuitem" tabindex='+
		   sensorsIndex +'href="#" onclick="loadGraph('+sensorsIndex+')">'+sensorType+ ": "+sensorName+'</a></li>');
		   sensorsIndex++;
		}, false);
	}
	//SensoManChart**
					
	//**SensoManAllSensors // to call the SensoManAllSensors sensor module
	function SensoManAllSensorsIsConnected(currentToken){		
		SensoManAllSensors("SensoManAllSensors", currentToken, []);

		// Listen for the facebookPostsContextValueEvent
		document.addEventListener('SensoManAllSensorsContextValueEvent', function (e12) { 
				var json = cms.cmContextVariables["SensoManAllSensors"];
					document.getElementById("sensoManAllSensors").innerHTML = 
					'Data: ' + JSON.stringify(json);
			
		}, false);
	}
	//SensoManAllSensors**
		
	//**SensoManSensorHistory // to call the SensoManSensorHistory sensor module
	function SensoManSensorHistoryIsConnected(currentToken){			
		SensoManSensorHistory("SensoManSensorHistory", currentToken, [{sensorID:"4"}]);

		// Listen for the facebookPostsContextValueEvent
		document.addEventListener('SensoManSensorHistoryContextValueEvent', function (e13) { 
			document.getElementById("sensoManSensorHistory").innerHTML = 
							" <br> " + JSON.stringify(cms.cmContextVariables["SensoManSensorHistory"]);
		}, false);
	}
	//SensoManSensorHistory**
	
	//**FacebookConnect
	function FacebookIsConnected(fbData){
		//**FacebookInformation // to get the initial value of the FacebookInfo
		//var fbData =new Array("name","email","gender","username","birthday");
		FacebookInformation(fbData);
		
		document.addEventListener('facebookInfoContextValueEvent', function (e14) { 
			var fbInfo = cms.cmContextVariables["facebookInfo"];
			//console.log("fbInformation: " + fbInfo);
		
			var fb_data = 'Good to see you, ' + fbInfo['name'] + '.' + 
			'<br> Email: ' + fbInfo['email'] + '.' + 
			'<br> Gender: ' + fbInfo['gender'] + '.' +
			'<br> Birthday: ' + fbInfo['birthday'] + '.';
			
			var picture = 'https://graph.facebook.com/' + fbInfo['id'] + '/picture'
			
			appendImageToElement('fbInfo', picture, 100, 100, 'FB Profile Picture');
			
			if (fbInfo)
				document.getElementById("fbInfo").style.display = "block";
			
			document.getElementById("facebookInfo").innerHTML = fb_data;
		}, false);
		//FacebookInformation**
		
		//**FacebookPosts // to call the FacebookPosts reasoner module
		FacebookPosts(50);
	
		// Listen for the facebookPostsContextValueEvent
		document.addEventListener('facebookPostsContextValueEvent', function (e15) { 
			document.getElementById("facebookPosts").innerHTML = 
							" <br> " + cms.cmContextVariables["facebookPosts"];
		}, false);
		//FacebookPosts**
		
	}
	//FacebookConnect**
	
	//**LinkedInConnect
	function LinkedinIsConnected(){
	
		//**LinkedinInformation 
		var inData = new Array("firstName", "lastName", "pictureUrl", "positions", "summary", "industry");
		LinkedInInformation(inData);
		
		
		document.addEventListener('linkedInInfoContextValueEvent', function (e16) { 
			var liInfo = cms.cmContextVariables["linkedInInfo"];
			
			var li_data = 'Good to see you, ' + liInfo['firstName'] + ' ' + liInfo['lastName'] + '.' + 
			'<br><br> Positions: ' + JSON.stringify(liInfo['positions'])  + 
			'<br><br> Summary: ' + JSON.stringify(liInfo['summary']) + '<br><br> Industry: ' + liInfo['industry'] + '<br><br>.';
			
			
			if (liInfo){
				document.getElementById("liInfo").style.display = "block";
				document.getElementById("liInfo").innerHTML = li_data;
				var picture = liInfo['pictureUrl'];
				appendImageToElement('liInfo', picture, 100, 100, 'LinkedIn Profile Picture');
			}

		}, false);
		//LinkedinInformation**
	}
	//LinkedInConnect**
	
	
	//**RestfulService
	function callRestfulService2(latitude,longitude){
	
		// freegeoip.net is a public RESTful web service API for searching geolocation of IP addresses and host names.
		var restfulURL2 = 'https://api.forecast.io/forecast/cb62a7d0d848ee5b56245de83d1013d6/' + latitude + ',' + longitude;
		RestfulService(restfulURL2, 'restfulService2');
		
		// to handle events when the RESTfulService value changes
		document.addEventListener('restfulService2ContextValueEvent', function (e17) { 
				var weather = cms.cmContextVariables["restfulService2"];
				document.getElementById("restfulService2").innerHTML = 'Current Weather: ' + weather.currently.summary + ', ' + 
																		'Current Temperature: ' + weather.currently.temperature + 'F';
		}, false);
	
	}
	//RestfulService**
	
	//**BatteryAnalyser
	function getBatteryLevelAnalysis(batteryLevel, cutOff){
		// to call the batteryLevel analysis module
		BatteryAnalyser(batteryLevel, cutOff);		
		
		// to handle events when the batteryLevel analysis is received
		document.addEventListener('batteryAnalyserContextValueEvent', function (e18) { 
				var reasoning = cms.cmContextVariables["batteryAnalyser"];
				document.getElementById("batteryAnalyser").innerHTML = '(>=' + cutOff + '): ' +reasoning;
		}, false);
	
	}
	//BatteryAnalyser**