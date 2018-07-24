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
// var inquirer = require('inquirer');
var request = require('request');
var fs = require('fs');

// variables for taking in LIRI commands
var commands = process.argv;
var liriCommand = commands[2];

var userArg = '';
for (var i = 3; i < commands.length; i++) {
    userArg += commands[i] + ' ';
}

// logic for printing tweets from @MadamnMarkdown ////////////////////////////////////////////
function getTweets() {
    var params = {screen_name: 'MadamnMarkdown', count: 10};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var prettyPrintHandle = `\n--------------------\n` +
                `@MadamnMarkdown's Tweet:\n`.cyan +
                `--------------------\n\n`;
            for (var i = 0; i < tweets.length; i++) {
                console.log (
                    prettyPrintHandle + `Tweeted on: ` + tweets[i].created_at + `\n` + 
                    `Tweet body: ` + tweets[i].text + `\n` +
                    `--------------------\n`
                );

                // append tweets to log here
                fs.appendFile(`log.txt`, prettyPrintHandle + `Tweeted on: ` + tweets[i].created_at + `\n` + 
                `Tweet body: ` + tweets[i].text + `\n` +
                `--------------------\n`, (err) => {
                    if (err) throw err;
                    console.log(`Tweets logged!`);
                });
        
            } // closing for loop

        } else {
            prettyPrintError = `----- Error getting tweets! ----- ` + error;
            console.log(prettyPrintError);

            // append error to log here
            fs.appendFile(`log.txt`, prettyPrintError, (err) => {
                if (err) throw err;
                console.log(`----- Error logging tweets! ----- `.red);
            });
        }
    });
}; // closing getTweets function

// logic for getting song info from spotify //////////////////////////////////////////////////
function getSongData(song) {
    
    // if user enters blank search, bless them with Al Green
    var search;
        if (song === '') {
            search = 'What More Do You Want From Me';
        } else {
            search = song;
        }

    spotify.search({ type: 'track', query: search }, function(err, data) {

        if (err) {
            // append error to log here
            fs.appendFile(`log.txt`, `----- Error getting song data! -----`, (err) => {
                if (err) throw err;
            });
            return console.log('----- Error getting song data! ----- ' + err);
        
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
        fs.appendFile(`log.txt`, prettyPrintSong, (err) => {
            if (err) throw err;
            console.log(`Song Data logged!`);
        });
    });
}; // closing getSongData function

// logic for getting movie data //////////////////////////////////////////////////////////////
function getMovieData(movie) {
    var search;
    if (movie === '') {
        search = 'Black Panther';
    } else {
        search = movie;
    }

    // replace spaces in user's search query with + to make it work
    search = search.split(' ').join('+');

    var movieQuery = 'http://www.omdbapi.com/?t=' + search + '&plot=full&tomatoes=true&apikey=trilogy';
    request(movieQuery, function(error, response, body) {
        
        if (!error && response.statusCode === 200) {

            // save movie data in variable easier to work with
            var movieData = JSON.parse(body);
            var prettyPrintMovie = `--------------------\n` +
                `Movie Data:\n` +
                `--------------------\n\n` +
                `Title: `.magenta + movieData.Title + `\n` +
                `\nYear Released: `.magenta + movieData.Released + `\n` +
                `\nIMDB Rating: `.magenta + movieData.imdbRating + `\n` +
                `\nRotten Tomatoes Rating: `.magenta + movieData.tomatoRating + `\n` +
                `\nCountry Where Produced: `.magenta + movieData.Country + `\n` +
                `\nLanguage: `.magenta + movieData.Language + `\n` +
                `\nPlot: `.magenta + movieData.Plot + `\n` +
                `\nActors: `.magenta + movieData.Actors + `\n`;

            console.log(prettyPrintMovie);

            // log movie data to log.txt here
            fs.appendFile(`log.txt`, prettyPrintMovie, (err) => {
                if (err) throw err;
            });

        } else if (error || response.statusCode !== 200) {
            // print error to console
            console.log(`----- Error getting movie data! -----`);
            // log error in log.txt
            fs.appendFile(`log.txt`, `----- Error getting movie data! -----`, (error) => {
                if (error) throw error;
            });
        }
    }); // closing movie request function
};

// defining LIRI commands ////////////////////////////////////////////////////////////////////
switch (liriCommand) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        getSongData(userArg);
        break;
    case 'movie-this':
        getMovieData(userArg);
        break;
    // case 'do-what-it-says':
    //     causeISaidSo();
    //     break;
}

// commands
    // spotify-this-song
        // if error, print error to console
        // if error, log error to log.txt 

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
        
    // do-what-it-says
        // if user runs blank query, get song from random.txt
        // if user runs blank query, print stats on black panther (from random.txt?)

    // print list of commands if user puts in unrecognized command