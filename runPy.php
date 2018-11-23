<?php 
	$command = "python predictor.py ".$_POST["id"]." ".$_POST["timestamp"];
	$output = shell_exec($command);
	echo $output;
?>
