"use strict";
require('mapbox.js');
var L = window.L;

module.exports = function createMarker(latLng) {
  var icon = L.divIcon({
    className: 'drone-point',
    html: '<div></div>'
  });
  var marker = L.marker(latLng, {
    icon: icon
  });
  return marker;
};
