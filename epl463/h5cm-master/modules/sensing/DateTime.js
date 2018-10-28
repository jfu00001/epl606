
function DateTime() {
	   var singletonContextManager = ContextManagerSingleton.getInstance("dateTime", ["dateTime"]);
	   
	   var now = new Date();
	   
	   var weekday = new Array(7);
		weekday[0]=  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var dayName = weekday[now.getDay()];

	   var day = now.getDate();
	   var months = new Array(7);
		months[0]=  "January";
		months[1] = "February";
		months[2] = "March";
		months[3] = "April";
		months[4] = "May";
		months[5] = "June";
		months[6] = "July";
	   months[7] = "August";
		months[8] = "September";
		months[9] = "October";
		months[10] = "November";
		months[11] = "December";

	   var month = months[now.getMonth()];
	   var year = now.getFullYear();
	   
	   var date = dayName + ' ' + day + ' ' + month + ' ' + year;
	   
	   var hours = now.getHours();
	   var minutes = now.getMinutes();
	   var time = hours + ':' + minutes;
	
	   if (now != undefined) {
		    singletonContextManager.cmContextVariables["dateTime"] = date + ' ' + time;
			document.dispatchEvent(singletonContextManager.contextEvents["dateTimeContextValueEvent"]);
			console.log( "DateTime is fired -> Requested DateTime is returned: " + date + ' ' + time);
	   }
	   else{
		    singletonContextManager.cmContextVariables["dateTime"] = "Unexpected DateTime error!";
			document.dispatchEvent(singletonContextManager.contextEvents["dateTimeContextValueEvent"]);
			console.log( "DateTime is fired -> Requested DateTime is returned: DateTime error!" );
 
	   }	   

}