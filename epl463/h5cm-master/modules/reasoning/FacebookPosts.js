var singletonContextManager = ContextManagerSingleton.getInstance("facebookPosts", ["facebookPosts"]);

var restaurants = new Array();
var j = 0; 		  

    function FacebookPosts(postsLimit) {
		
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
			console.log('Good to see you, ' + response.name + '.');
		});
		FB.api('/me?fields=posts.limit(' + postsLimit +')', reply);

	}
  
	function reply(data) {
		  // how to parse multi-dimensional JSON object - example  
		  // var obj2 = JSON.parse('{"work":[{"employer":{"id":"185998961446429","name":"Pvt Ltd"}}]}');
		  // alert("Parsing with Json : " + JSON.stringify(obj2.work[0].employer.name));
		  
		  var result = JSON.stringify(data);
		  //console.log( 'FacebookPosts Result: ' +  result);
		  var obj1 = JSON.parse(result);
		  //console.log(data);
		  size = obj1.posts.data.length;
			
		  for (var i = 0; i < size; i++) {
			var post = obj1.posts.data[i];
			if (post.place != undefined){
				/* make the API call */
				FB.api("/"+post.place.id, restaurants_posts, restaurants, j);
				
			}
		  }	 
	}
	
	function restaurants_posts(data){
		  if (data && !data.error) {
			  /* handle the result */
			  var result = JSON.stringify(data);
			  
			  var obj2 = JSON.parse(result);
			  if (obj2.restaurant_specialties != undefined){
					  //console.log( "Restaurant name: " + obj2.name + " Category: " + JSON.stringify(obj2.restaurant_specialties));
					  restaurants[j] = " <br> Restaurant name: " + obj2.name + " Category: " + JSON.stringify(obj2.restaurant_specialties);
					   singletonContextManager.cmContextVariables["facebookPosts"] = restaurants.toString();
					   document.dispatchEvent(singletonContextManager.contextEvents["facebookPostsContextValueEvent"]);
					   console.log( "facebookPosts is fired -> Requested facebookPosts is returned." );
					  j++;
			  }
		  }
	}
	
	function fbPermissions(permissions){
				FB.login(function(response) {
					if (response.authResponse) {
						// The person logged into your app
					} 
				}, {scope: permissions});
	}
	