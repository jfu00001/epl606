//extends RestFullService2 of h5cm to dispay current location temperature in celsius with 2 decimals
function weather(){
	var latitude = document.getElementById("lat").value;
	var longitude = document.getElementById("lng").value;
	var restfulURL2 = 'https://api.forecast.io/forecast/cb62a7d0d848ee5b56245de83d1013d6/' + latitude + ',' + longitude;
	RestfulService(restfulURL2, 'restfulService2');		
	document.addEventListener('restfulService2ContextValueEvent', function (e17) { 
			var weather = cms.cmContextVariables["restfulService2"];
			var c = fahrenheitToCelsius(weather.currently.temperature);
			document.getElementById("weather").innerHTML =  'Current Weather: ' + weather.currently.summary + ', ' + 
															'Current Temperature: ' + c.toFixed(2) + ' &deg;C';
	}, false);
}