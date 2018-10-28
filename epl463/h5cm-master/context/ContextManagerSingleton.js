
function loadDependencies(scriptsURL){
	// *** Create an array to hold our promises
            var promises = [ ];
			
            for (var i=0; i < scriptsURL.length; i++){ 
                // *** Store the promise returned by getSizeSettingsFromPage in a variable
				console.log('Loading dependency: ' + scriptsURL[i]);
                promise = $.getScript( scriptsURL[i] );
				
                promise.then(function() {
                    // *** When the promise is resolved
                    
                });
				
                // // *** Add the promise returned by getScript to the array
                promises.push(promise);
            }
            // *** Call dependenciesLoaded after all promises have been resolved
            Q.all(promises).then(dependenciesLoaded);
}

var ContextManagerSingleton = (function () {

    var instance;

    function createInstance() {
        var object = new Object("ContextManagerSingleton Instance.");	
		object.wsCounter = 0;
		object.restfulCounter = 0;	
		object.cmContextVariables = [];
		object.contextEvents = [];
		instance = object;
    }
	
    return {
        getInstance: function (context, pluginContextVariables) {

			if (!instance) {
				console.log('creating the ContextManagerSingleton instance.');
			
				// *** Create an array to hold our plugins loading promises
				var promises = [ ];
				var contextManagerScriptsURL = new Array("h5cm-master/context/ContextUtilityFunctions.js");
				
				for (var i=0; i < contextManagerScriptsURL.length; i++){
					var cmPlugin = JSON.stringify(contextManagerScriptsURL[i]);
					// *** Store the promise returned by getSizeSettingsFromPage in a variable
					promise = $.getScript( contextManagerScriptsURL[i] );
					
					promise.then(function(contextManagerScriptsURL) {
						// *** When the promise is resolved
						console.log('Loading ContextManager dependency: ' + cmPlugin + ' OK!');
					});
					
					// // *** Add the promise returned by getScript to the array
					promises.push(promise);
				}
				// *** Call dependenciesLoaded after all promises have been resolved
				Q.all(promises).then(createInstance());
            }
			console.log("pluginContextVariables: "+ JSON.stringify(pluginContextVariables));
			for	(i = 0; i < pluginContextVariables.length; i++) {
				var key = pluginContextVariables[i];
				var value = pluginContextVariables[i];
				console.log("key: "+ key + " value: "+ value );
				instance.cmContextVariables[key] = value;
			}
			console.log( context + " context initialised");
			
			var contextEvent  = context + "ContextValueEvent"; 
			
				instance.contextEvents[contextEvent] = new CustomEvent(contextEvent, {
					detail: { message: contextEvent, time: new Date() },
						bubbles: true, cancelable: true	}
				);
				console.log(contextEvent + " context event initialised.");
			
			return instance;
        }
		
    };
 
	
})();