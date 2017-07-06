//code you need to grab the data from keys.js. 
//Then store the keys in a variable.
var request = require("request");
var movieName; //= process.argv[3];

if (process.argv[3]){
	movieName = process.argv[3];
} else {
	movieName = "Mr. Nobody";
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

//fs package to read and write
var fs = require("fs");
var stuffINeed = require("./keys.js");
var action = process.argv[2];

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "c61b6feb748443afb6987bde99e3b7ee",
    secret: "5bd6a15e62524ea5a1158726dda636ee"
});


var Twitter = require('twitter');

// console.log("\n\n\n\n********\n"+stuffINeed.twitterKeys.consumer_key);
var client = new Twitter({
    consumer_key: 'OXJaxvnkLgxWEktQfG0As8CJw',
    consumer_secret: 'LwuBzMqqBkEh0m49AezHjDxvIvGbEhO5PJiWPnNSVm1AY1cFFF',
    access_token_key: '879831270842404864-f8AwIiJnGiJYVAFD9pa1FmRipZWoIOs',
    access_token_secret: 'bl6zO0cEcZvAZEM8F3Sqbbptrc45X5G71uEkA4SkXQvOz'
});

var params = { lhutch519: 'nodejs' };

//COMMANDS
console.log(stuffINeed)

switch (action) {

    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong(process.argv[3]);
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

//my-tweets
function myTweets() {

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);

            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text)
                console.log(tweets[i].created_at);
            };
        };
    });
};

//spotify-this-song
function spotifySong(songTitle = "The Sign") {
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (songTitle == "The Sign") {
            console.log(data.tracks.items[4].album.artists[0].name);
            console.log(data.tracks.items[4].name);
            console.log(data.tracks.items[4].preview_url)
            console.log(data.tracks.items[4].album.name);
        } else {
            console.log(data.tracks.items[0].album.artists[0].name)
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url)
            console.log(data.tracks.items[0].album.name);
        }

    });
};

// movie-this
function movieThis() {
    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request was successful...
        if (!error && response.statusCode === 200) {

            // Then log the body from the site!
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release data: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

// do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        // console.log(data);

        var dataArr = data.split(",");
        console.log(dataArr);

        var command = dataArr[0];
        console.log("Command: " + command)

        if (command == "spotify-this-song") {
            spotifySong(dataArr[1]);
        }
    })
};

// function setMovieName(argv3){

// }
