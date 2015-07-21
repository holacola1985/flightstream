"use strict";
require('mapbox.js');
var template = require('./marker.hbs');
var L = window.L;

module.exports = function createMarker(latLng) {
  var icon = L.divIcon({
    className: 'drone-point',
    html: template({
      height: 18  
    })
  });
  var marker = L.marker(latLng, {
    icon: icon
  });
  return marker;
};
