"use strict";
var $ = require('jquery');
var _ = require('lodash');

function SampleData() {
  this.data = [];
}

SampleData.prototype.load = function load() {
  return $.get('geo-sample.csv', function(str) {
    this.parse(str);
  }.bind(this));
};

SampleData.prototype.parse = function parse(str) {
  var lines = str.split('\r\n');
  _.each(lines, function(line, l) {
    if (l > 0 && line) {
      var values = line.split(',');
      var record = {
        data: {
          picture_hd: values[0],  
          thumbnail: values[1].replace('"', '').replace('"',''), 
          //thumbnail: values[0], 
          altitude: parseFloat(values[4]),
          //altitude: parseFloat(values[3]),
          yaw: parseFloat(values[5]),
          pitch: parseFloat(values[6]),
          roll: parseFloat(values[7]),
        },
        geojson: {
          type: 'Point',
          coordinates: [parseFloat(values[2]), parseFloat(values[3])]
          //coordinates: [parseFloat(values[1]), parseFloat(values[2])]
        }
      };
      this.data.push(record);
    }
  }, this);
};

module.exports = SampleData;
