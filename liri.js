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
    let client = new twitter('./keys.twitter');
    let twitterUser = process.argv[3]
  
  
    
}

 //spotify
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
            console.log("==========================================")
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Release Year: " + JSON.parse(body).Year)
            console.log("IMDB rating : " + JSON.parse(body).imdbRating)
            console.log("Rotten Tomatoe rating : " + JSON.parse(body).Ratings[1].Value)
            console.log("Country flimed in: " + JSON.parse(body).Country)
            console.log("Language : " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors)
            console.log("==========================================")
        }
    });
}
//random text
function randomTxt() {
    console.log('do-what-it-says')
}