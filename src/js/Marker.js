"use strict";
var $ = require('jquery');
require('mapbox.js');
var L = window.L;
var template = require('./marker.hbs');
var m2px = require('./meterToPixel.js');




function Marker(options) {
  this.data = options.data;
  this.layer = options.layer;
  this.render();
  this.setPosition();
}

Marker.prototype.render = function render() {
  if (this.$el) {
    this.$el.remove();
  }
  this.$el = $(template({}));
  this.$el.appendTo(this.layer._el);
  this.setHeight();
};

Marker.prototype.setHeight = function() {
  var height = m2px.convertMeterInPixel(
    this.data.data.altitude * 0.3048,
    this.data.geojson.coordinates[0],
    this.layer._map.getZoom()
  );
  $('.altitude', this.$el).css({
    height: height + 'px',
    transform: 'rotateX(-90deg) translateY(-' + height + 'px)'
  });
};


Marker.prototype.setPosition = function setPosition() {
  var el = this.$el[0];
  var pos = this.layer._map.latLngToLayerPoint(this.data.geojson.coordinates);
  L.DomUtil.setPosition(el, pos);
  /*
  this.$el.css({
    top: pos.y,
    left: pos.x
  });
  */
};

module.exports = Marker;
