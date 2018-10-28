// https://developers.google.com/maps/documentation/embed/guide

function myFunction() {
    var x = document.getElementById("myText").value;
	var type = document.getElementById("gmap_type").value;
	var loc = "https://www.google.com/maps/embed/v1/search?q="+type+"+in+"+x+"&key=AIzaSyD7UXXkxi0WJxRnAcadZk8CH_FOuPCVPIU";
	document.getElementById("mapframe").src = loc;
}