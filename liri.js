//initial
var spotify = require('spotify');
var Twitter = require('twitter');
var request = require('request');
var filesystem = require("fs");
//end initial

searcher=process.argv[3];
for (var x=4; x<process.argv.length; x++){
	searcher=searcher+" "+process.argv[x];
}
console.log("Your search term: "+searcher);
searcherUp=process.argv[2];

twitterVars=require("./keys.js");





function main(){

if (searcherUp==="spotify-this-song") { //spotify
	
	if (searcher===undefined){ //Rick rolled
		searcher="Never Gonna Give You Up"
		console.log("No search query given: Searching from memory")
	}

	//spotify searcher
	spotify.search({ type: 'track', query: searcher }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
 
		for (var x=0; x<data.tracks.items[0].artists.length; x++){
			console.log("Artist "+(x+1)+"'s name: "+data.tracks.items[0].artists[x].name);
		}
		console.log("Full track name: "+data.tracks.items[0].name);
		console.log("Preview link: "+data.tracks.items[0].preview_url);
		console.log("Album name: "+data.tracks.items[0].album.name);
	});
	//end spotify searcher
} //end spotify

else if (searcherUp==="my-tweets") { //twitter
	console.log("KEYS: "+twitterVars.twitterKeys);
	var params = {screen_name: 'nodejs'};
	daisy=twitterVars.twitterKeys
	bell=new Twitter({daisy});
	bell.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
    		console.log(tweets);
		}
		//pTweets=JSON.parse(tweets);
		//pResponse=JSON.parse(response);
		//console.log(pResponse);
		console.log(tweets); //twitter authorization never worked, just guessing here
	});
} //end twitter

else if (searcherUp==="movie-this") { //OMDB/request
	
	if (searcher===undefined){
		searcher="Mr. Nobody"
		console.log("No search query given: Using Defaults")
	}

	request('http://www.omdbapi.com/?t='+searcher, function (error, response, body) {
		if(error) {console.log('Error:', error)}; 
		//console.log('Body:', body);
		pBody=JSON.parse(body);

		console.log("Title: "+pBody.Title);
		console.log("Year Released: "+pBody.Year);
		console.log("IMDB Rating: "+pBody.imdbRating);
		console.log("Country of Origin: "+pBody.Country);
		console.log("Language: "+pBody.Language);
		console.log("Plot: "+pBody.Plot);
		console.log("Actors: "+pBody.Actors);
		console.log("Rotten Tomatoes Rating: "+pBody.Ratings[1].Value);
	});
} //end OMDB/request

else if (searcherUp==="do-what-it-says") { //DWIS
	console.log("Running DWIS")
	filesystem.readFile("random.txt", "utf8", function(error, data) {
		var dataArr = data.split(",");
		searcherUp=dataArr[0];
		searcher=dataArr[1];
		main();
		
	});

} //end DWIS

else {
	console.log("----")
	console.log("VALID SEARCHES ARE 'do-what-it-says', 'movie-this', 'my-tweets', and 'spotify-this-song'")
}

};

main();
