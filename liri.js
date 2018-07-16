require("dotenv").config();

require('keys.js')
//let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let argsTwitter = process.argv[2]
console.log(client)
