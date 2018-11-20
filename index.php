<!DOCTYPE html>
<html lang="en" >
    <head>
        <meta charset="utf-8" />
        <title> SmartParking </title>
        <link href="styles.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>    
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIOuH3LKiE4RGFl3Gr45aopd7MyyHNEEA&libraries=places&sensor=false"></script>
		<script src="scripts/google_places.js"></script>
		
    </head>
    <body class="w3-light-grey">
		<!-- Navigation Bar -->
		<div class="w3-bar w3-white w3-border-bottom w3-xlarge">
		  <img src="smartparking.png" style="width: 150px; padding-top: 5px; padding-left: 10px;"><img>
		 <!--  <a href="#" class="w3-bar-item w3-button w3-right w3-hover-red w3-text-grey"><i class="fa fa-search"></i></a>-->
		</div>
		<!-- Page content -->
		<div class="w3-content myclass" style="max-width:1100px;">
		 <br>
		  <div class="w3-row-padding">
			<div class="w3-full w3-margin-bottom">
			   <h2>Available Parking</h2>
			   <div id="gmap_canvas"></div>
			   
				<div class="w3-container "id="gmap_input">
					<p>Predict parking availability:</p>
					<form action="/runPy.php">
					  <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" id="parking_title" readonly></p>
					  <p><input class="w3-input w3-padding-16 w3-border" type="datetime-local" placeholder="Time"></p>
					  <p><button class="w3-button w3-black w3-padding-large" type="submit">SUBMIT</button></p>
					</form>
				</div>
			</div>
		  </div>
		 <!-- https://stackoverflow.com/questions/19735250/running-a-python-script-from-php -->		 
		<!-- End page content -->
		</div>
		
		<!-- Footer -->
		<footer class="w3-container w3-center w3-opacity w3-margin-bottom">
		  <div class="w3-xlarge w3-padding-16">
			<i class="fa fa-facebook-official w3-hover-opacity"></i>
			<i class="fa fa-instagram w3-hover-opacity"></i>
			<i class="fa fa-snapchat w3-hover-opacity"></i>
			<i class="fa fa-pinterest-p w3-hover-opacity"></i>
			<i class="fa fa-twitter w3-hover-opacity"></i>
			<i class="fa fa-linkedin w3-hover-opacity"></i>
		  </div>
		</footer>

		<script>
			function placemarkers() {
				<?php
				  $dbc = mysqli_connect("localhost","ubuntu","epl606","parking");
				  $result = mysqli_query($dbc,"SELECT * FROM parking");
              	  while ($entry = mysqli_fetch_object($result)) {
              	  	
              	  	$space = mysqli_query($dbc,"SELECT space FROM `data` where parking_id = ".$entry->uid." order by timestamp DESC LIMIT 1");
              	  	$spacenow = mysqli_fetch_object($space);
              	  	echo "markParking(".$entry->lat.",".$entry->lon.",'".$entry->title."','".$spacenow->space."');";

              	  }
				?>
				// markParking("35.171279", "33.357727", "title", "3");
			}
			/* 0 0.25 0.5 0.75 1 */			
		</script>
		
	</body>
</html>