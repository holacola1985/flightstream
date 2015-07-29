"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
var Control3D = require('./Control3D');
var DroneLayer = require('./DroneLayer');
var Router = require('./Router');
var Info = require('./Info');
//var lightstream = require('lightstream-socket');
require('mapbox.js');
var L = window.L;
L.mapbox.accessToken = 'pk.eyJ1IjoiZnJhbmNrZXJuZXdlaW4iLCJhIjoiYXJLM0dISSJ9.mod0ppb2kjzuMy8j1pl0Bw';

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
  map.on('mousedown', function() {
    $('.control input').attr('checked', false);
  });
  map.addLayer(layer);

  var $follow = $('#follow-drone');

  new Router({
    collection: collection
  });

  collection.on('reset', function() {
    collection.once('add', function(model) {
      map.setView(model.get('geojson').coordinates, map.getZoom());
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
  collection.on('active', function(model) {
    info.render(model);
  });
  
  map.on('load', function(){
    Backbone.history.start();
  });
});
