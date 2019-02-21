// client-side js
// run by the browser each time your view template is loaded

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
    
    fetch('/search-track').then(resp => resp.json()).then((data) => {
=======
$(function() {
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
<<<<<<< HEAD
    let h3 = document.createElement("h3");
    h3.innerHTML = `<a href=${data.external_urls.spotify} target="_blank">${data.name}</a>`
      
    let searchTrack = document.getElementById("search-track-container");
    searchTrack.appendChild(h3);
    
    // Display the artist name
    let artists = '';
=======
    var trackName = $(
      // '<h3><a href="' + data.external_urls.spotify + '" target="blank">' + data.name + '</a></h3>'
      `<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`
    );
    trackName.appendTo('#search-track-container');
    
    // Display the artist name
    var artists = '';
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    
    data.artists.forEach(function(item) {
      artists = artists + item.name + ' ';
    });
    
    let h5 = document.createElement('h5');
    h5.innerText = artists;
<<<<<<< HEAD
    searchTrack.appendChild(h5);
    
    // Display the album art
    var img = document.createElement('img');
    var src = document.createAttribute('src');
    src.value = data.album.images[0].url;
    img.setAttributeNode(src);
    searchTrack.appendChild(img);
  });
  
  fetch('/category-playlists').then(resp => resp.json()).then((data) => {
=======
    document.getElementById('search-track-container').append(h5);
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
  $.get('/category-playlists', function(data) {
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data
      .forEach((c) => {
<<<<<<< HEAD
      let categoryPlaylists = document.getElementById('category-playlists-container');
      let br1 = document.createElement('br');
      let h1 = document.createElement('h1');
      h1.innerHTML = c.name;
      br1.appendChild(h1);
      let br2 = document.createElement('br');
      br1.appendChild(br2);
      categoryPlaylists.appendChild(br1);
      
      c.data.playlists.items.map(function(playlist, i) {
        let img = document.createElement('img');
        let imgClass = document.createAttribute('class');
        imgClass.value = "cover-image";
        let src = document.createAttribute('src');
        src.value = playlist.images[0].url;
        img.setAttributeNode(imgClass);
        img.setAttributeNode(src);
        categoryPlaylists.appendChild(img);
      });
    })
  });
  
  fetch('/audio-features').then(resp => resp.json()).then((data) => {
=======
      $('#category-playlists-container').append(`<br><h1>${c.name}</h1><br>`)
      c.data.playlists.items.map(function(playlist, i) {
      var img = $('<img class="cover-image"/>');
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
    })
  });
  
  $.get('/audio-features', function(data) {
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
<<<<<<< HEAD
    let keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"];
    let audioFeatures = document.getElementById('audio-features-container');
=======
    var keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"]
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
<<<<<<< HEAD
        let p = document.createElement('p');
        p.innerHTML = `<span class="big-number">${data[key]}</span>${key}</p>`;
        // var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        audioFeatures.appendChild(p);
=======
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
      }
    });
  });
  
<<<<<<< HEAD
  fetch('/artist').then(resp => resp.json()).then((data) => {
=======
  $.get('/artist', function(data) {
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
<<<<<<< HEAD
    let img = document.createElement('img');
    let imgClass = document.createAttribute('class');
    imgClass.value = "circle-image";
    let src = document.createAttribute('src');
    src.value = data.images[0].url;
    img.setAttributeNode(imgClass);
    img.setAttributeNode(src);
    
    let artist = document.getElementById('artist-container');
    artist.appendChild(img);
    
    // Display the artist name
    let h3 = document.createElement('h3');
    h3.innerHTML = data.name;
    artist.appendChild(h3);
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      let p = document.createElement('p');
      p.innerHTML = genre;
      artist.appendChild(p);
    });
  });
  
  fetch('/artist-top-tracks').then(resp => resp.json()).then((data) => {
=======
    var img = $('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
  });
  
  $.get('/artist-top-tracks', function(data) {
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
<<<<<<< HEAD
    let topTracks = document.getElementById('top-tracks-container');
    
    // Display the audio features
    data.map(function(track, i) {
      let li = document.createElement('li');
      li.innerHTML = track.name;
      topTracks.appendChild(li);
=======
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
>>>>>>> dc8ed6231ff6946a2c619a5347c12ce63156fdc6
    });
  });

});
