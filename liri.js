// getting required keys for twitter and spotify
require('dotenv').config();

// loading node modules
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var request = require('request');
var fs = require('fs');

// loading twitter keys
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// logic for printing tweets from @MadamnMarkdown
var params = {screen_name: 'MadamnMarkdown', count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var prettyPrint = `--------------------\n` +
            `@MadamnMarkdown's Tweets:\n` +
            `--------------------\n\n`;
        for (var i = 0; i < tweets.length; i++) {
            // this is printing 1, then 1,2 then 1,2,3 etc
            console.log (
                prettyPrint += `Tweeted on: ` + tweets[i].created_at + `\n` + 
                `Tweet body: ` + tweets[i].text + `\n` +
                `--------------------\n`
            );
        } // closing for loop
    }
}); // closing get


// commands
    // my-tweets
        // prints last 20 tweets and their dates tweeted from @MadamnMarkdown
    
    // spotify-this-song
        // prints song name,
        // artist(s)
        // song album
        // link to song preview
        // if song can't be found, default to 'what more do you want from me' by al green

    // movie-this
        // prints movie name 
        // Year the movie came out.
        // IMDB Rating of the movie.
        // Rotten Tomatoes Rating of the movie.
        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie.
        // if no movie, print stats on black panther

    // do-what-it-says