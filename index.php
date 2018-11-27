<!DOCTYPE html>
<html lang="en" >
    <head>
        <meta charset="utf-8" />
        <title> SmartParking </title>
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>    
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIOuH3LKiE4RGFl3Gr45aopd7MyyHNEEA&libraries=places&sensor=false"></script>
		<script src="scripts/mapMarker.js"></script>
		
    </head>
    <body class="w3-light-grey w3-mobile">
		<!-- Navigation Bar -->
		<div class="w3-bar w3-white w3-border-bottom w3-xlarge">
			<img src="smartparking.png" style="width: 150px; padding-top: 5px; padding-left: 10px;"><img>
		</div>
		<!-- end of Navigation Bar -->

		<!-- Page content -->
		<div class="w3-content" style="max-width:1100px;">
		
			<div class="w3-full w3-margin-bottom w3-padding-16">
				<div id="gmap_canvas" style="width:100%;height:300px;"></div>
		 
				<div id="gmap_input" style="width:25%;">
					<p>Predict parking availability:</p>
					
					<form id="submit-form">
					  <input class="w3-input w3-border" type="text" placeholder="Name" id="parking_title" readonly>
					  <p><input class="w3-input w3-border" type="datetime-local" placeholder="Time" id="time"></p>
					  <div id="availability" style="display: inline-block;position: relative;">
					  	Availability
					  </div>
					  <p><button class="w3-button w3-black" type="submit">SUBMIT</button></p>

					</form>
					
				</div>
			 </div>
		</div>
		<!-- end of Page content -->

		<script>
			function placemarkers() {
				<?php
				  $dbc = mysqli_connect("localhost","ubuntu","epl606","parking");
				  $result = mysqli_query($dbc,"SELECT * FROM parking");
              	  while ($entry = mysqli_fetch_object($result)) {
              	  	
              	  	$space = mysqli_query($dbc,"SELECT space FROM `data` where parking_id = ".$entry->uid." order by timestamp DESC LIMIT 1");
              	  	$spacenow = mysqli_fetch_object($space);
              	  	echo "markParking(".$entry->lat.",".$entry->lon.",'".$entry->title."','".$spacenow->space."','".$entry->uid."');";

              	  }
				?>
			}
		</script>
		
	</body>
</html>