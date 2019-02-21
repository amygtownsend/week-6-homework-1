// client-side js
// run by the browser each time your view template is loaded

document.addEventListener("DOMContentLoaded", function() {
    
    fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
      
    let searchTrack = document.getElementById("search-track-container");
    
    data
      .forEach((c) => {
      // Display the track name
      let h3 = document.createElement("h3");
      h3.innerHTML = `<a href=${c.data.external_urls.spotify} target="_blank">${c.name}</a>`
      searchTrack.appendChild(h3);
      
      // Display the artist name
      let artists = '';
      c.data.artists.forEach(function(item) {
        artists = artists + item.name + ' ';
      });
      
      let h5 = document.createElement('h5');
      h5.innerText = artists;
      searchTrack.appendChild(h5);
      
      // Display the album art
      let img = document.createElement('img');
      let src = document.createAttribute('src');
      src.value = c.data.album.images[0].url;
      img.setAttributeNode(src);
      searchTrack.appendChild(img);
    })
    
  });
  
  fetch('/category-playlists').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data
      .forEach((c) => {
      let categoryPlaylists = document.getElementById('category-playlists-container');
      let br = document.createElement('br');
      let h1 = document.createElement('h1');
      h1.innerHTML = c.name;
      let br2 = document.createElement('br');
      categoryPlaylists.appendChild(br)
      categoryPlaylists.appendChild(h1);
      categoryPlaylists.appendChild(br2);
      
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
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    let keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"];
    let audioFeatures = document.getElementById('audio-features-container');
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        let p = document.createElement('p');
        p.innerHTML = `<span class="big-number">${data[key]}</span>${key}</p>`;
        // var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        audioFeatures.appendChild(p);
      }
    });
  });
  
  fetch('/artist').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
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
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    let topTracks = document.getElementById('top-tracks-container');
    
    // Display the audio features
    data.map(function(track, i) {
      let li = document.createElement('li');
      li.innerHTML = track.name;
      topTracks.appendChild(li);
    });
  });

});
