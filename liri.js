require("dotenv").config();
let fs = require('fs')
let keys = require('./keys.js')
let twitter = require('twitter')
let spotify = require('spotify')
let liri = process.argv[2]

//let spotify = new Spotify(keys.spotify);



switch (liri){
    case 'tweets': tweets(); break
    case 'spotify': spot(); break
    case 'movie': movie(); break
    case 'random': randomTxt(); break
    default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
			"1. tweets 'any twitter name' " +"\r\n"+
			"2. spotify 'any song name' "+"\r\n"+
			"3. movie 'any movie name' "+"\r\n"+
			"4. random."+"\r\n"+
			"Be sure to put the movie or song name in quotation marks if it's more than one word."); 
}

//functions 
//twitter
function tweets() {
    let client = new twitter(keys.twitter);
 console.log('tweets')
}
// spotify
function spot(){
    console.log('spot')
}
//movies
function movie(){
    console.log('movie')
}
//random text
function randomTxt(){
    console.log('txt')
}