<?php 
	$command = 'python predictor.py 4 1542730931';
	$output = shell_exec($command);
	echo $output." as";
?>