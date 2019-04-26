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

var getArtistName = function(artist){
  return artist.name
};

const spotifyInfo = function(choice){
  spotify.search({ type: 'track', query: choice, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    const song = data.tracks.items;
    console.log(song);
    for(let i = 0; i < song.length; i++){
      console.log("Song Result #" + (i+1)); 
      let artistsArray = song[i].album.artists.data;
      console.log(artistsArray);
      // for(let i = 0; i < artistsArray.length; i++){
      //   let artistObject = artistsArray[0];
      //   console.log("Artist: " + artistObject);
      // } 
      console.log("Artist: " + song[i].artists.map(getArtistName)); 
      console.log("Song Name: " + song[i].name); 
      console.log("Preview Link: " + song[i].preview_url); 
      console.log("Album: " + song[i].album.name); 
      console.log("**".repeat(40)); 
    } 
  });
};

var getVenueName = function(venue){
  return venue.name
};
const bandInfo = function(choice){
  let bandName = choice;
  let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function(response) {
      let bandData = response;
      for(var i = 0; i < bandData.length; i++){
        console.log( bandData[i] );
      }
      // console.log(bandData);
      // console.log("Info: "+data.EventData);
      console.log("Name of the venue: ");
      console.log("Venue location: ");
      console.log("Date of the Event: ");
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

