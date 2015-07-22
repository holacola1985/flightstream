"use strict";
var $ = require('jquery');
var Control3D = require('./Control3D');
var DroneLayer = require('./DroneLayer');
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
    el: $('.control-3d'),
  });

  //control.set3dMode();


  map.setView([1.367245, 103.809247], 17);

  var getPxBounds = map.getPixelBounds;
  map.getPixelBounds = function() {
    var bounds = getPxBounds.call(this);
    // ... extend the bounds
    bounds.min.x = bounds.min.x - 2000;
    bounds.min.y = bounds.min.y - 2000;
    bounds.max.x = bounds.max.x + 2000;
    bounds.max.y = bounds.max.y + 2000;
    return bounds;
  };

  var layer = new DroneLayer();
  map.addLayer(layer);
  layer.appendMarker([1.365052, 103.806350]);
  layer.appendMarker([1.366775, 103.808111]);
  layer.appendMarker([1.367245, 103.809247]);
  layer.appendMarker([1.367095, 103.808750]);
  layer.appendMarker([1.366113, 103.807654]);
  layer.appendMarker([1.367095, 103.810338]);
  layer.appendMarker([1.366628, 103.811908]);
});
