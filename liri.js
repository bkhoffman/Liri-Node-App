//Everything Required
require("dotenv").config();
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("./node_modules/moment");
//Grab user inputs
let command = process.argv[2];
let userInput = process.argv[3];

//Pass "choice" arg into movieInfo function query OMDB api, log Data
const movieInfo = function(choice){
  let movieName = choice;
  let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      //Use a "for loop" to iterate through Ratings array of Objects to get to Rotten Tomatos
      let rating = response.data.Ratings;
      for(let i = 2; i < rating.length; i++){
        let rottenTomObject = rating[1];
        console.log("Rotten Tomatos Rating: " + rottenTomObject.Value);
      }
      console.log("Country: " + response.data.Country); 
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot); 
      console.log("Actors: " + response.data.Actors); 
      console.log("**".repeat(40)); 
    }
  );
};
//Pass user Choice arg into spotifyInfo func. Check for no song input and assign to "The Sign" default if blank.
//Query with limit 1. Return Data
const spotifyInfo = function(choice){
  if(choice === undefined) {
		choice = "the sign ace of base";
	}
  spotify.search({ type: 'track', query: choice, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    const song = data.tracks.items;
    // console.log(song);
    for(let i = 0; i < song.length; i++){
      console.log("Song Result:");
      console.log("Artist: " + song[i].artists[0].name);  
      console.log("Song Name: " + song[i].name); 
      console.log("Preview Link: " + song[i].preview_url); 
      console.log("Album: " + song[i].album.name); 
      console.log("**".repeat(40)); 
    } 
  });
};

//Bands In Town function with user choice passed in. Use Moment to format date.
const bandInfo = function(choice){
  let bandName = choice;
  let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(
    function(response) {
      let bandData = response.data;
      // console.log(bandData);
      for(var i = 0; i < 10; i++){ 
        console.log("Name of the venue: "  + bandData[i].venue.name);
        if (bandData[i].venue.region = " "){
          console.log("Venue location: " + bandData[i].venue.city +", " + bandData[i].venue.country);
        }else{
          console.log("Venue location: " + bandData[i].venue.city + ", " + bandData[i].venue.region + 
          ", " + bandData[i].venue.country);
        }
        let dateTime = moment(bandData[i].datetime).format('MMMM Do YYYY, h:mm a');
        console.log("Date of the Event: " + dateTime);
        console.log("**".repeat(40));
      }
    }
  );
};

const randomInfo = function(){
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(error, data){
    if(error){
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr[1]);
    let randomCommand = dataArr[0];
    let randomSong = dataArr[1];
    userChoices(randomCommand, randomSong);
  })
};
//Pass user input into Switch function to invoke appropriate function
//Pass user choice as args into those fuctions to send Requests
const userChoices = function(type, choice){
  console.log("User Choices: " + type, choice);
  switch(type){
    case 'movie-this': movieInfo(choice);
    break;
    case 'spotify-this-song': spotifyInfo(choice);
    break;
    case 'concert-this': bandInfo(choice);
    break;
    case 'do-what-it-says': randomInfo();
    break;
    default: console.log("Liri doesn't understand that command")
  }
};
userChoices(command, userInput);

