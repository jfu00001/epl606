var geocoder;var map;var markers = Array();var infos = Array();function initialize() {	// prepare Geocoder	geocoder = new google.maps.Geocoder();	var lat = '35.171279';	var lng = '33.357727';	var cur_location = new google.maps.LatLng(lat, lng);	var myOptions = { 		zoom: 14,		center: cur_location,		mapTypeId: google.maps.MapTypeId.ROADMAP	};	map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);	// markParking();	placemarkers();}var currentInfo = null;function markParking(lat, lon, title, space, id){		var myLatlng = new google.maps.LatLng(lat, lon);	var marker = new google.maps.Marker({		map: map,		position: myLatlng,		title: title,		availability: space,		icon: {                             			url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"                           			}	});	markers.push(marker);		var infowindow = new google.maps.InfoWindow({		content: '<font style="color:#000;">' + marker.title +		'<br />Availability: ' + marker.availability +'</font>'	});	google.maps.event.addListener(marker, 'click', function() {		if(currentInfo) currentInfo.close();		infowindow.open(map,marker);		currentInfo = infowindow;        document.getElementById('parking_title').value=String(title);        $("#parking_title").attr("parking_id",id);	});	infos.push(infowindow);}// initializationgoogle.maps.event.addDomListener(window, 'load', initialize);$( document ).ready(function() { $("#submit-form").submit(function(e) {                    $.ajax({                           type: "POST",                           url: "runPy.php",                           data: {                                    id: $("#parking_title").attr("parking_id"),                                    timestamp: Date.parse($("#time").val())/1000                                   },                           success: function(data)                           {                           	                           	var av = data.substring(1,data.length-2);                           	var availability=parseFloat(av);                           	                           	console.log(availability);                           	if(availability>0&&availability<0.2){                           		$("#availability").css("background-color", "red");                           		$("#availability").text("Very low Availability")                           	}                           	else if(availability>=0.2&&availability<0.4){                           		$("#availability").css("background-color", "orange");								$("#availability").text("Low Availability")                            }                            else if(availability>=0.4&&availability<0.6){                            	$("#availability").css("background-color", "grey");                           		$("#availability").text("Average Availability")                            }                            else if(availability>=0.6&&availability<0.8){                            	$("#availability").css("background-color", "yellow");                           		$("#availability").text("High Availability")                            }                            else if(availability>=0.8&&availability<=1.0){                            	$("#availability").css("background-color", "green");                           		$("#availability").text("Very high Availability")                            }                         }});                    e.preventDefault(); // avoid to execute the actual submit of the form.                });});