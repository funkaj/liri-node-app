require("dotenv").config();
let fs = require('fs')
let keys = require('./keys.js')
let twitter = require('twitter')
let spotify = require('spotify')
let request = require('request')
let liri = process.argv[2]

switch (liri) {
    case 'tweets':
        tweets();
        break
    case 'spotify':
        spot();
        break
    case 'movie':
        movie();
        break
    case 'random':
        randomTxt();
        break
    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. tweets 'any twitter name' " + "\r\n" +
            "2. spotify 'any song name' " + "\r\n" +
            "3. movie 'any movie name' " + "\r\n" +
            "4. random" + "\r\n")
            
}

//functions 
//twitter
function tweets() {
    let client = new twitter(keys.twitter);
    console.log('tweets')
}
// spotify
function spot() {
    let spotify = new Spotify(keys.spotify);
    console.log('spot')
}
//movies
function movie() {
    let movieRequest = process.argv[3]
         if (!process.argv[3]) {
             movieRequest = 'Mr. Nobody'
             console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>")
             console.log("It's on Netflix!")
         } 
    request(`http://www.omdbapi.com/?t=${movieRequest}&y=&plot=short&apikey=922877d0`, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log(
            "==========================================" + "\r\n" +
            "Title: " + JSON.parse(body).Title + "\r\n" +
            "Release Year: " + JSON.parse(body).Year + "\r\n" +
            "IMDB rating : " + JSON.parse(body).imdbRating + "\r\n" +
            "Rotten Tomatoe rating : " + JSON.parse(body).Ratings.Value + "\r\n" +
            "Country flimed in: " + JSON.parse(body).Country + "\r\n" +
            "Language : " + JSON.parse(body).Language + "\r\n" +
            "Plot: " + JSON.parse(body).Plot + "\r\n" +
            "Actors: " + JSON.parse(body).Actors + "\r\n" +
            "==========================================")
        }
    });
}
//random text
function randomTxt() {
    console.log('txt')
}