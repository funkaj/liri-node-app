require("dotenv").config();
let fs = require('fs')
let keys = require('./keys.js')
let twitter = require('twitter')
let spotify = require('node-spotify-api')
let request = require('request')
let liri = process.argv[2]
let value = process.argv[3]
runLiri()

function runLiri() {
    switch (liri) {
        case 'my-tweets':
            tweets(value);
            break
        case 'spotify-this-song':
            spot(value);
            break
        case 'movie-this':
            movie(value);
            break
        case 'do-what-it-says':
            randomTxt();
            break
        default:
            console.log("==================================================================" +
                "\nTry typing one of the following commands after 'node liri.js' :" +
                "\n1. my-tweets 'any twitter name" +
                "\n2. spotify-this-song 'any song name" +
                "\n3. movie-this 'any movie name" +
                "\n4. do-what-it-says")
    }
}
//functions 
function bonus() {
    var textFile = 'log';
    fs.appendFile(textFile, log, function (err) {
        if (err) {
            console.log(err);
        } 
    });
}
console.log('==========================================' + 
'\nLogged');
//twitter
function tweets(value) {
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

                log = '\n==========================================' +
                    '\nTweet ' + [i + 1] + '. ' + tweets[i].text +
                    '\nCreated on: ' + tweets[i].created_at
                console.log(log)
                bonus(log)
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
    newSpotify.search({
        type: 'track',
        query: value
    }, function (err, data) {
        if (err) {
            logOutput.error(err);
            return
        }
        log = '\n==========================================' +
            '\nArtist(s): ' + data.tracks.items[0].album.artists[0].name +
            '\nSong: ' + data.tracks.items[0].name +
            '\nSpotify Preview URL: ' + data.tracks.items[0].preview_url +
            '\nAlbum Name: ' + data.tracks.items[0].album.name
        console.log(log)
        bonus(log)
    });
}
//movies
function movie(value) {
    if (!value) {
        value = 'Mr. Nobody'
        console.log("If you haven't watched 'Mr. Nobody', then you should: <https://www.imdb.com/title/tt0485947/>" + "\nIt's on Netflix!")
    }
    request(`https://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=922877d0`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            log = '\n==========================================' +
                '\nTitle: ' + JSON.parse(body).Title +
                '\nRelease Year: ' + JSON.parse(body).Year +
                '\nIMDB rating : ' + JSON.parse(body).imdbRating +
                '\nRotten Tomatoe rating : ' + JSON.parse(body).Ratings[1].Value +
                '\nCountry flimed in: ' + JSON.parse(body).Country +
                '\nLanguage : ' + JSON.parse(body).Language +
                '\nPlot: ' + JSON.parse(body).Plot +
                '\nActors: ' + JSON.parse(body).Actors
            console.log(log)
            bonus(log)
        }
    });
}
//random text
function randomTxt() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let dataArr = data.split(",");
        liri = dataArr[0]
        value = dataArr[1]
        runLiri(liri, value)
    });
}