"use strict";
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
var Control3D = require('./Control3D');
var DroneLayer = require('./DroneLayer');
var SampleData = require('./SampleData');
var Info = require('./Info');
//var lightstream = require('lightstream-socket');
require('mapbox.js');
var L = window.L;
L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';

var sample = new SampleData();
var Model = Backbone.Model.extend({
  getCoordinates: function getCoordinates() {
    return this.get('geojson').coordinates;
  }
});
var Collection = Backbone.Collection.extend({
  model: Model
});
var collection = new Collection();

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

  var layer = new DroneLayer({
    collection: collection
  });
  map.addLayer(layer);

  var $follow = $('#follow-drone');


  sample.load().done(function() {
    map.setView(sample.data[0].geojson.coordinates, 17);
    _.each(sample.data, function(item, i) {
      var id = i;
      setTimeout(function() {
        if (item.geojson.coordinates[0] && item.geojson.coordinates[1]) {
          item.id = id;
          collection.add(item);
        }
      }, 1200 * i);
    });
  });

  collection.on('add', function(model) {
    if ($follow.is(':checked')) {
      map.setView(model.get('geojson').coordinates, map.getZoom());
      model.trigger('active', model);
    }
  });

  var info = new Info({
    el: '.info'
  });
  collection.on('active', function(model){
    info.render(model);
  });
});
