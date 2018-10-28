
function getUserCamera() {
	
	
		var video = document.querySelector('video');
		
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		
		if (navigator.getUserMedia) {
			// Call the getUserMedia method here
			navigator.getUserMedia({audio:true, video: true}, successCallback, errorCallback);
		} else {
			// Display a friendly "sorry" message to the user.
			document.getElementById("camera").innerHTML = 'Native device media streaming (getUserMedia) not supported in this browser.';
		}
		
		function successCallback(stream) {
			if (video.mozSrcObject !== undefined) {
				video.mozSrcObject = stream;
			} else {
				video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
			};
			video.play();
			document.getElementById("camera").innerHTML = 'Native device media streaming (getUserMedia) supported in this browser.';
		}
		
		function errorCallback(error) {
			document.getElementById("camera").innerHTML = 'An error occurred: [CODE ' + error.code + ']';
			// Display a friendly "sorry" message to the user
		}
		
}





// window.URL = window.URL || window.webkitURL;
		// navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
								  // navigator.mozGetUserMedia || navigator.msGetUserMedia;

		// var video = document.querySelector('video');

		// if (navigator.getUserMedia) {
		  // navigator.getUserMedia({video: true}, function(stream) {
			// video.src = window.URL.createObjectURL(stream);
		  // }, onFailSoHard);
		// } else {
		  // video.src = 'somevideo.webm'; // fallback.
		// }
		
		// var onFailSoHard = function(e) {
			// alert('Reeeejected!', e);
		// };
   
		// function hasGetUserMedia() {
		  // // Note: Opera is unprefixed.
		  // return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
					// navigator.mozGetUserMedia || navigator.msGetUserMedia);
		// }

		// if (hasGetUserMedia()) {
		  // // Good to go!
		  // alert('getUserMedia() is supported in your browser');
		  // navigator.getUserMedia({video: true}, successCallback, errorCallback);

		// } else {
		  // alert('getUserMedia() is not supported in your browser');
		// }