"use strict";
var $ = require('jquery');
var _ = require('lodash');
var Control3D = require('./Control3D');
var DroneLayer = require('./DroneLayer');
var SampleData = require('./SampleData');
//var lightstream = require('lightstream-socket');
require('mapbox.js');
var L = window.L;
L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';

var sample = new SampleData();

$(document).ready(function() {

  var map = L.mapbox.map('map', 'franckernewein.925cb8ba', {
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

  var getPxBounds = map.getPixelBounds;
  map.getPixelBounds = function() {
    var bounds = getPxBounds.call(this);
    bounds.min.x = bounds.min.x - 2000;
    bounds.min.y = bounds.min.y - 2000;
    bounds.max.x = bounds.max.x + 2000;
    bounds.max.y = bounds.max.y + 2000;
    return bounds;
  };

  var layer = new DroneLayer();
  map.addLayer(layer);

  var $follow = $('#follow-drone');

  sample.load().done(function() {
    map.setView(sample.data[0].geojson.coordinates, 17);
    _.each(sample.data, function(item, i) {
      setTimeout(function() {
        if (item.geojson.coordinates[0] && item.geojson.coordinates[1]) {
          layer.appendMarker(item);
          if ($follow.is(':checked')) {
            map.setView(item.geojson.coordinates, map.getZoom());
          }
        }
      }, 300 * i);
    });
  });
  /*
  layer.appendMarker([1.366775, 103.808111]);
  layer.appendMarker([1.367245, 103.809247]);
  layer.appendMarker([1.367095, 103.808750]);
  layer.appendMarker([1.366113, 103.807654]);
  layer.appendMarker([1.367095, 103.810338]);
  layer.appendMarker([1.366628, 103.811908]);
  */
});
