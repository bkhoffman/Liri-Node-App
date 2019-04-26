require("dotenv").config();
const keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

const axios = require("axios");

let command = process.argv[2];
let userInput = process.argv[3];


const movieInfo = function(choice){
  let movieName = choice;
  let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      let rating = response.data.Ratings;
      // console.log(rating);
      for(let i = 0; i < rating.length; i++){
        let rottenTomObject = rating[1];
        // console.log(rottenTomObject);
        console.log("Rotten Tomatos Rating: " + rottenTomObject.Value);
      }
      console.log("Country: " + response.data.Country); 
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot); 
      console.log("Actors: " + response.data.Actors); 
      console.log("---".repeat(30)); 
    }
  );
};



const spotifyInfo = function(choice){
  spotify.search({ type: 'track', query: choice }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    const song = data.tracks.items;
    for(let i = 0; i < song.length; i++){
      console.log("Song Result #" + (i+1)); 
      console.log("Artist: " + song[i].name); 
      console.log("**".repeat(40)); 
    } 
  });
};



let userChoices = function(type, choice){
  console.log(type, choice);
  switch(type){
    case 'movie-this': movieInfo(choice);
    break;
    case 'spotify-this-song': spotifyInfo(choice);
    break;
    default: console.log("Liri doesn't understand that command")
  }
};
userChoices(command, userInput);

