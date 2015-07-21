require('mapbox.js');

var L = window.L;

L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';


var map = L.mapbox.map('map', 'franckernewein.70945bd6', {
  zoomControl: false,
  attributionControl: false,
  tileLayer: {
    noWrap: true
  }
});

//map.setView([0, 0]);
