//code you need to grab the data from keys.js. 
//Then store the keys in a variable.
var request = require("request");
//fs package to read and write
var fs = require("fs");
var stuffINeed = require("./keys.js");
var action = process.argv[2];

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'OXJaxvnkLgxWEktQfG0As8CJw',
    consumer_secret: 'LwuBzMqqBkEh0m49AezHjDxvIvGbEhO5PJiWPnNSVm1AY1cFFF',
    access_token_key: '879831270842404864-f8AwIiJnGiJYVAFD9pa1FmRipZWoIOs',
    access_token_secret: 'bl6zO0cEcZvAZEM8F3Sqbbptrc45X5G71uEkA4SkXQvOz'
});

var params = { lhutch519: 'nodejs' };

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);

        for (i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        };
    };
});

//COMMANDS
// my-tweets
console.log(stuffINeed)

switch (action) {

    // case "my-tweets":
    //     myTweets();
    //     break;

    case "spotify-this-song":
        spotifySong();
        break;
}

// function myTweets() {
//     fs.readFile("")
// }


function spotifySong() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }

        console.log(data);
    });
}

// movie-this

// do-what-it-says
