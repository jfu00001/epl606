function LinkedInConnect() {
	var singletonContextManager = ContextManagerSingleton.getInstance("linkedInConnect", ["linkedInConnect"]);
	
	IN.Event.on(IN, "auth", function() {onLinkedInLogin();});
	IN.Event.on(IN, "logout", function() {onLinkedInLogout();});

	function onLinkedInLogout() {
		singletonContextManager.cmContextVariables["linkedInConnect"] = "user_logout";
		document.dispatchEvent(singletonContextManager.contextEvents["linkedInConnectContextValueEvent"]);
		console.log( "LinkedinConnect is fired -> Requested LinkedinConnect is returned: user_logout." );
	}

	function onLinkedInLogin() {
		singletonContextManager.cmContextVariables["linkedInConnect"] = "user_connected";
		document.dispatchEvent(singletonContextManager.contextEvents["linkedInConnectContextValueEvent"]);
		console.log( "LinkedinConnect is fired -> Requested LinkedinConnect is returned: user_connected." );
	}
}

