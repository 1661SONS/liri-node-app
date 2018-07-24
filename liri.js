// getting required keys for twitter and spotify
require('dotenv').config();

// loading node modules
var colors = require('colors');
var Twitter = require('twitter');
    // loading twitter keys
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
var Spotify = require('node-spotify-api');
    // loading spotify keys
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
var inquirer = require('inquirer');
var request = require('request');
var fs = require('fs');

// logic for printing tweets from @MadamnMarkdown ////////////////////////////////////////////
var params = {screen_name: 'MadamnMarkdown', count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        var prettyPrintHandle = `--------------------\n` +
            `@MadamnMarkdown's Tweet:\n`.cyan +
            `--------------------\n\n`;
        for (var i = 0; i < tweets.length; i++) {
            console.log (
                prettyPrintHandle + `Tweeted on: ` + tweets[i].created_at + `\n` + 
                `Tweet body: ` + tweets[i].text + `\n` +
                `--------------------\n`
            );
        } // closing for loop

        // append tweets to log here

    } else {
        prettyPrintError = `----- Error getting tweets! ----- ` + error;
        console.log(prettyPrintError);

        // append error to log here

    }
}); // closing twitter get function

// logic for getting song info from spotify //////////////////////////////////////////////////
spotify.search({ type: 'track', query: 'It Gets Better (With Time)' }, function(err, data) {
    if (err) {
      return console.log('----- Error getting song info! ----- ' + err);
      
      // append error to log here
    
    } // else condition here with condition for misspelled song title & append 2nd error string to log
    var songData = data.tracks.items[0];
    var prettyPrintSong = `--------------------\n` +
        `Song Data:\n` +
        `--------------------\n\n` +
        `Title: ` + songData.name + `\n` +
        `Artist: ` + songData.artists[0].name + `\n` +
        `Album: ` + songData.album.name + `\n` +
        `Listen Here: ` + songData.preview_url + `\n`;

    console.log(prettyPrintSong.green);

    // append sondData to log here

});

// commands
    // my-tweets
        // log tweets to log.txt
        // if error, print error to console
        // if error, log error to log.txt
    
    // spotify-this-song
        // log song data to log.txt
        // if error, print error to console
        // if error, log error to log.txt
        // if user runs blank query, get song from random.txt 

    // movie-this
        // prints movie name 
        // Year the movie came out.
        // IMDB Rating of the movie.
        // Rotten Tomatoes Rating of the movie.
        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie.
        // log movie data to log.txt
        // if error, print error to console
        // if error, log error to log.txt
        // if user runs blank query, print stats on black panther (from random.txt?)

    // do-what-it-says