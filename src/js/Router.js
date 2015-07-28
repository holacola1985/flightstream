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
  this.collection.reset();
  var timeouts = this.timeouts = [];
  var collection = this.collection;
  $.get(url, function(str) {
    var lines = str.split('\r\n');
    lines.shift();
    lines = _.filter(lines, function(line){
      return line && line !== ',,,,,,,,,';
    });
    var data = _.map(lines, parseLine);
    //console.log(data);
    _.each(data, function(item, i) {
      //console.log('yo');
      var id = i;
      timeouts.push(setTimeout(function() {
        if (item.geojson.coordinates[0] && item.geojson.coordinates[1]) {
          
          item.id = id;
          /*
          if (id < 8) {
            item.data.altitude = id * 130 / 8;
          }
          */
          collection.add(item);
        }
      }, 1200 * i + 10));
    });
  });
}

function parseLine(line){
  var values = line.split(',');
  console.log(values);
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
