function GoogleCalendar() {

 var singletonContextManager = ContextManagerSingleton.getInstance("googleCalendar", ["googleCalendar"]);
	/**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
        gapi.client.load('calendar', 'v3', listUpcomingEvents);

		/**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
		  if (events.length > 0) {
		   singletonContextManager.cmContextVariables["googleCalendar"] = events;
			document.dispatchEvent(singletonContextManager.contextEvents["googleCalendarContextValueEvent"]);
			console.log( "GoogleCalendar is fired -> Requested GoogleCalendar events are returned!");
			}
			else{
			
			singletonContextManager.cmContextVariables["googleCalendar"] = 'No upcoming events found.';
			document.dispatchEvent(singletonContextManager.contextEvents["googleCalendarContextValueEvent"]);
			console.log( "GoogleCalendar is fired -> Requested GoogleCalendar No upcoming events found!");
			}
        });
		}
	  
}