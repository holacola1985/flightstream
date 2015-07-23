"use strict";

var EARTH_CIRCUMFERENCE = 40075017;

function getMeterByPixel(lat, zoomLevel) {
  return EARTH_CIRCUMFERENCE * Math.cos(lat) / Math.pow(2, (zoomLevel + 8));
}

function convertMeterInPixel(meter, lat, zoomLevel) {
  return meter * getMeterByPixel(lat, zoomLevel);
}

module.exports = {
  getMeterByPixel: getMeterByPixel,
  convertMeterInPixel: convertMeterInPixel
};
