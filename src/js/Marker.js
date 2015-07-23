"use strict";
var $ = require('jquery');
var template = require('./marker.hbs');
var m2px = require('./meterToPixel.js');

function Marker(options) {
  this.data = options.data;
  this.layer = options.layer;
  this.render();
  this.setPosition();
  this.layer._map.on('viewreset', function(){
    this.setPosition();
  }.bind(this));
}

Marker.prototype.render = function render() {
  if(this.$el){
    this.$el.remove();
  }
  this.$el = $(template({
    height: m2px.convertMeterInPixel(this.data.data.altitude * 0.3048);
  })); 
  this.$el.appendTo(this.layer._el);    
};


Marker.prototype.setPosition = function setPosition() {
  var pos = this.layer._map.latLngToLayerPoint(this.data.geojson.coordinates);
  this.$el.css({
    top: pos.y,
    left: pos.x
  });
};

module.exports = Marker;
