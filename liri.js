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
            "4. random." + "\r\n" +
            "Be sure to put the movie or song name in quotation marks if it's more than one word.");
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
    request(`http://www.omdbapi.com/?t=${movieRequest}&y=&plot=short&apikey=922877d0`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Release Year: " + JSON.parse(body).Year)
            console.log("IMDB rating : " + JSON.parse(body).imdbRating)
            console.log("Rotten Tomatoe rating : " + JSON.parse(body).Ratings.Value)
            console.log("Country flimed in: " + JSON.parse(body).Country)
            console.log("Language : " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
//random text
function randomTxt() {
    console.log('txt')
}