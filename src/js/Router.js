"use strict";
var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  routes: {
    'flight/:id': load
  },
  initialize: initialize,
  load: load,
  reload: reload,
  addItem: addItem,
  goToEnd: goToEnd
});

function initialize(options) {
  this.collection = options.collection;
}

function load(id) {
  this.currentId = id;
  var url = '/flightstream_geo-' + id + '.csv';
  _.each(this.timeouts, clearTimeout);
  this.timeouts = [];
  this.collection.reset(null);
  $.get(url, function(str) {
    var lines = str.split('\r\n');
    lines.shift();
    lines = _.filter(lines, function(line) {
      return line && line !== ',,,,,,,,,';
    });
    this.data = _.map(lines, parseLine);
    _.each(this.data, function(item, i) {
      item.id = i;
      this.timeouts.push(setTimeout(function() {
        this.addItem(item);
      }.bind(this), 1200 * i + 10));
    }, this);
  }.bind(this));
}

function reload() {
  this.load(this.currentId);
}

function addItem(item) {
  if (item.geojson.coordinates[0] && item.geojson.coordinates[1]) {
    this.collection.add(item);
    if (item === _.last(this.data)) {
      this.collection.trigger('end');
    }
  }
}

function goToEnd() {
  _.each(this.timeouts, clearTimeout);
  this.timeouts = [];
  _.each(this.data, this.addItem, this);
}

function parseLine(line) {
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
