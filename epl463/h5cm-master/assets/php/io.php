<?php

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
	$filename = $_POST['filename'];
	$contents = $_POST['contents'];
    switch($action) {
        case 'write' : write($filename, $contents);break;
        case 'read' : read($filename);break;
    }
}
else if(isset($_GET['action']) && !empty($_GET['action'])) {
	$action = $_GET['action'];
	$filename = $_GET['filename'];
	switch($action) {
        case 'write' : write($filename, $contents);break;
        case 'read' : read($filename);break;
    }
}

function write($file, $data) {
// Write the contents to the file
file_put_contents($file, $data);
}


function read($file) {
	// Open the file to get existing content - file created if it does not exist
	$content = file_get_contents($file);
	echo ($content);
}
?>