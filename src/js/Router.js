"use strict";
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  routes: {
    'flight/:id': load
  },
  initialize: initialize,
  load: load
});

function initialize(options) {
  this.collection = options.collection;
}

function load(id) {
  var url = '/flightstream_geo-' + id + '.csv';
  _.each(this.timeouts, clearTimeout);
  this.collection.reset(null);
  this.timeouts = [];
  $.get(url, function(str) {
    var lines = str.split('\r\n');
    lines.shift();
    lines = _.filter(lines, function(line){
      return line && line !== ',,,,,,,,,';
    });
    var data = _.map(lines, parseLine);
    _.each(data, function(item, i) {
      var id = i;
      this.timeouts.push(setTimeout(function() {
        if (item.geojson.coordinates[0] && item.geojson.coordinates[1]) {
          item.id = id;
          this.collection.add(item);
        }
      }.bind(this), 1200 * i + 10));
    }, this);
  }.bind(this));
}

function parseLine(line){
  var values = line.split(',');
  return {
    data: {
      picture_hd: values[0],  
      thumbnail: values[1], 
      //thumbnail: values[0], 
      altitude: parseFloat(values[4]),
      //altitude: parseFloat(values[3]),
      yaw: parseFloat(values[5]),
      pitch: parseFloat(values[6]),
      roll: parseFloat(values[7]),
      speed: parseFloat(values[8]),
      battery: values[9],
    },
    geojson: {
      type: 'Point',
      coordinates: [parseFloat(values[2]), parseFloat(values[3])]
      //coordinates: [parseFloat(values[1]), parseFloat(values[2])]
    }
  };
}
