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
      //Rotten Tomatos Rating is an array...might need for loop to reach the info
      var rating = JSON.parse(response.data.Ratings)
      for(let i = 0; i < rating.length; i++){
        console.log("Rotten Tomatos Rating: " + rating[1]); //not working
      }
      
      console.log("Country: " + response.data.Country); 
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot); 
      console.log("Actors: " + response.data.Actors); 
      console.log("---".repeat(30)); 
    }
  );
};

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data); 
});

// const spotifyInfo = function(){

// };



let userChoices = function(type, choice){
  console.log(type, choice);
  switch(type){
    case 'movie-this': movieInfo(choice);
    break;
    case 'spotify-this': spotifyInfo(choice);
    break;
    default: console.log("Liri doesn't understand that command")
  }
};
userChoices(command, userInput);

