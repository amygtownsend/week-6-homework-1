// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//


app.get('/search-track', function (request, response) {
  
  let tracks = [
    {
      name: "Anagram"
    },
    {
      name: "Silvertongue"
    }
  ];
  
  // Search for a track!
  tracks.forEach((c) => {
    spotifyApi.searchTracks(
      `track:${c.name}`, 
      { limit : 1 }
    )
      .then((data) => {
        // Send the first (only) track object
        console.log(c.data);
        c.data = data.body.tracks.items[0];
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (tracks.filter(c => c.data !== undefined).length 
    !== tracks.length) {
      setTimeout(check, 500);
    } else {
      response.send(tracks);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
  
});

app.get('/category-playlists', function (request, response) {
  
  // Make an initial list of countries
  let countries = [
    {
      name: "Peru",
      code: "PE"
    },
    {
      name: "Colombia",
      code: "CO"
    },
  ];
  
  
  // Get the playlists for the given category for each country
  countries.forEach((c) => {
    spotifyApi.getPlaylistsForCategory(
      'latin', 
      { country: c.code, limit : 10 }
    )
      .then((data) => {
        // Persist the data on this country object
        c.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (countries.filter(c => c.data !== undefined).length 
    !== countries.length) {
      setTimeout(check, 500);
    } else {
      response.send(countries);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/audio-features', function (request, response) {
  
  // Make an initial list of countries
  let tracks = [
    {
      id: "6eN9yBWv9zFVZFXGsPrMxj",
      name: "Dog Days Are Over",
      artist: "Florence + The Machine"
    },
    {
      id: "3oAJPaILCEZtMCVkVgiPC5",
      name: "Spectrum",
      artist: "Florence + The Machine"
    },
  ];
  
  // Get the audio features for a track ID
  tracks.forEach((c) => {
    spotifyApi.getAudioFeaturesForTrack(c.id)
      .then((data) => {
        // Persist the data on this track object
        c.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (tracks.filter(c => c.data !== undefined).length 
    !== tracks.length) {
      setTimeout(check, 500);
    } else {
      response.send(tracks);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/artist', function (request, response) {
  
  let artists = [
    {
      id: "6LuN9FCkKOj5PcnpouEgny",
      name: "Khalid"
    },
    {
      id: "7EQ0qTo7fWT7DPxmxtSYEc",
      name: "Bastille"
    }
  ];
  
  // Get information about an artist
  artists.forEach((c) => {
    spotifyApi.getArtist(c.id)
      .then((data) => {
        // Persist the data on this track object
        c.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (artists.filter(c => c.data !== undefined).length 
    !== artists.length) {
      setTimeout(check, 500);
    } else {
      response.send(artists);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/artist-top-tracks', function (request, response) {
  
  let artists = [
    {
      id: "6LuN9FCkKOj5PcnpouEgny",
      code: "US",
      artist: "Khalid"
    },
    {
      id: "7EQ0qTo7fWT7DPxmxtSYEc",
      code: "SE",
      artist: "Bastille"
    },
  ];
  
  // Get an artist's top tracks in a country
  artists.forEach((c) => {
    spotifyApi.getArtistTopTracks(c.id, c.code)
      .then((data) => {
        // Persist the data on this track object
        c.data = data.body.tracks;
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (artists.filter(c => c.data !== undefined).length 
    !== artists.length) {
      setTimeout(check, 500);
    } else {
      response.send(artists);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});


//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//


// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
