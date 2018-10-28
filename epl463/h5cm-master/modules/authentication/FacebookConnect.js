var perms;

function FacebookConnect(permissions, channelFile){
	
	var singletonContextManager = ContextManagerSingleton.getInstance("facebookConnect", ["facebookConnect"]);
	var flag = true;
	perms = permissions;
	 window.fbAsyncInit = function() {
		  FB.init({
			appId      : '<ADD YOUR APP ID HERE>', // App ID
			channelUrl : channelFile, // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		  });
	
	
		  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
		  // for any authentication related change, such as login, logout or session refresh. This means that
		  // whenever someone who was previously logged out tries to log in again, the correct case below 
		  // will be handled. 
		  FB.Event.subscribe('auth.authResponseChange', function(response) {
			// Here we specify what we do with the response anytime this event occurs. 
			if (response.status === 'connected') {
			  // The response object is returned with a status field that lets the app know the current
			  // login status of the person. In this case, we're handling the situation where they 
			  // have logged in to the app.
			  if (flag){
				singletonContextManager.cmContextVariables["facebookConnect"] = "user_connected";
				document.dispatchEvent(singletonContextManager.contextEvents["facebookConnectContextValueEvent"]);
				console.log( "FacebookConnect is fired -> Requested FacebookConnect is returned." );
								
				FacebookPermissions(permissions);
				flag = false;
			  }
			  //window.location.replace('http://www.cs.ucy.ac.cy/~aachila/apps/h5cm/ContextAwareApplication.html');
			} 
		  });

		  FB.Event.subscribe('auth.logout', function(response) {
			// The person cancelled the login dialog
			singletonContextManager.cmContextVariables["facebookConnect"] = "user_logout";
			document.dispatchEvent(singletonContextManager.contextEvents["facebookConnectContextValueEvent"]);
			//window.location.reload();
		  });
		
		};
	 
	// Load the SDK asynchronously
	  (function(d){
		   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		   if (d.getElementById(id)) {return;}
		   js = d.createElement('script'); js.id = id; js.async = true;
		   js.src = "//connect.facebook.net/en_US/all.js";
		   ref.parentNode.insertBefore(js, ref);
	  }(document));
	  
	  
 }


function FacebookLogin(redirectURI){
	// you need to register your application to Facebook - to get a key and client id and add allowed
	// domains that can make a call to Facebook API. Go to https://developers.facebook.com/
	var loginURI = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=<ADD YOUR APP API KEY HERE>&signed_next=1' + 
				'&next=https://www.facebook.com/dialog/oauth?redirect_uri=' + 
				 redirectURI + '%26client_id%<ADD YOUR CLIENT ID HERE>&scope=' + perms;

	window.location.replace(loginURI);
}

function FacebookLogout(redirectURI){
		
		FB.logout();
	
}

	
	function FacebookPermissions(permissions){
				FB.login(function(response) {
					if (response.authResponse) {
						// The person logged into your app
					} 
				}, {scope: permissions});
	}