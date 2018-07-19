require("dotenv").config();
let fs = require('fs')
let keys = require('./keys.js')
let twitter = require('twitter')
let spotify = require('node-spotify-api')
let request = require('request')
let liri = process.argv[2]
let value = process.argv[3]

switch (liri) {
    case 'tweets':
        tweets();
        break
    case 'spotify':
        spot(value);
        break
    case 'movie':
        movie();
        break
    case 'do-what it says':
        randomTxt();
        break
    default:
        console.log("Try typing one of the following commands after 'node liri.js' :")
        console.log("1. tweets 'any twitter name")
        console.log("2. spotify 'any song name")
        console.log("3. movie 'any movie name")
        console.log("4. random")

}

//functions 
//twitter
function tweets() {
    let client = new twitter(keys.twitter)
    //let twitterUser = process.argv[3]
    let params = {
        q: '@Jacob96691972',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {

            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                console.log('==========================================' + '\nTweet ' + [i + 1] + '. ' + tweets[i].text +
                    '\nCreated on: ' + tweets[i].created_at)
            }
        } else {
            console.log(error)
        }
    });
}

//spotify
function spot(value) {
    if (!value) {
        value = 'The Sign Ace of Base'
    }
    let newSpotify = new spotify(keys.spotify)
    // Calls Spotify API to retrieve a track.
    newSpotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            logOutput.error(err);
            return
        }
        console.log('==========================================' +
            "\nArtist(s): " + data.tracks.items[0].album.artists[0].name +
            "\nSong: " + data.tracks.items[0].name +
            "\nSpotify Preview URL: " + data.tracks.items[0].preview_url +
            "\nAlbum Name: " + data.tracks.items[0].album.name);
    });
}
//movies
function movie() {
    let movieRequest = process.argv[3]
    if (!process.argv[3]) {
        movieRequest = 'Mr. Nobody'
        console.log("If you haven't watched 'Mr. Nobody', then you should: <https://www.imdb.com/title/tt0485947/>")
        console.log("It's on Netflix!")
    }
    request(`https://www.omdbapi.com/?t=${movieRequest}&y=&plot=short&apikey=922877d0`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('==========================================' +
                '\nTitle: ' + JSON.parse(body).Title +
                '\nRelease Year: ' + JSON.parse(body).Year +
                '\nIMDB rating : ' + JSON.parse(body).imdbRating +
                '\nRotten Tomatoe rating : ' + JSON.parse(body).Ratings[1].Value +
                '\nCountry flimed in: ' + JSON.parse(body).Country +
                '\nLanguage : ' + JSON.parse(body).Language +
                '\nPlot: ' + JSON.parse(body).Plot +
                '\nActors: ' + JSON.parse(body).Actors +
                '\n==========================================')
        }
    });
}
//random text
function randomTxt() {
    console.log('do-what-it-says')
}