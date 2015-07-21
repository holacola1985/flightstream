"use strict";
var $ = require('jquery');
var Control3D = require('./Control3D');
var createMarker = require('./Marker');
require('mapbox.js');

var L = window.L;

L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';


$(document).ready(function() {

  var map = L.mapbox.map('map', 'franckernewein.70945bd6', {
    zoomControl: false,
    attributionControl: false,
    tileLayer: {
      noWrap: true
    }
  });

  new Control3D({
    map: map,
    el: $('.control-3d')
  });


  map.setView([1.367245, 103.809247], 15);

  var marker = createMarker([1.367245, 103.809247]);
  marker.addTo(map);
  
  setTimeout(function(){
    console.log($('.drone-point'));
  }, 500);
});
