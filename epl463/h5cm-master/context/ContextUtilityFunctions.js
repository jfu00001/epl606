	
	function showstuff(boxid){
		document.getElementById(boxid).style.display = "block";
	}
 
	function hidestuff(boxid){
	   document.getElementById(boxid).style.display = "none";
	}

	function appendImageToElement(elementID, src, width, height, alt) {

		var img = document.createElement('img');
		var div = document.getElementById(elementID);
		
		img.src = src;
		img.width = width;
		img.height = height;
		img.alt = alt;
		
		// This next line will just add it to the div
		div.appendChild(img);
	}