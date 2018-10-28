function GoogleCalendarConnect() {

	  var singletonContextManager = ContextManagerSingleton.getInstance("googleCalendarConnect", ["googleCalendarConnect"]);
	  // Your Client ID can be retrieved from your project in the Google
      
	  // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '276356811846-fiiap9d4jnb1cfo741nu1thg1mni03ui.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
	  
	  handleAuthClick();
      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
	  
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          userConnected();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick() {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Dispatch event when user is connected to Google.
       */
      function userConnected() {
				singletonContextManager.cmContextVariables["googleCalendarConnect"] = "user_connected";
				document.dispatchEvent(singletonContextManager.contextEvents["googleCalendarConnectContextValueEvent"]);
				console.log( "GoogleCalendarConnect is fired -> Requested GoogleCalendarConnect is returned." );
      }
	  
}