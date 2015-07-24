"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
require('mapbox.js');
var L = window.L;
var template = require('./marker.hbs');
var m2px = require('./meterToPixel.js');

module.exports = Backbone.View.extend({
  initialize: initialize,
  render: render,
  setHeight: setHeight,
  setPosition: setPosition
});

function initialize(options) {
  this.layer = options.layer;
  this.render();
  this.setPosition();
}

function render() {
  var self = this;
  if (this.$el) {
    this.$el.remove();
    this.$el.off();
  }
  this.$el = $(template({}));
  this.$el.appendTo(this.layer._el);
  this.setHeight();
  this.$el.on('click', function(){
    console.log(self.model.get('data').thumbnail); 
  });
}

function setHeight() {
  var height = m2px.convertMeterInPixel(
    this.model.get('data').altitude,
    this.model.get('geojson').coordinates[0],
    this.layer._map.getZoom()
  );
  $('.altitude', this.$el).css({
    height: height + 'px',
    transform: 'rotateX(-90deg) translateY(-' + height + 'px)'
  });
}

function setPosition() {
  var el = this.$el[0];
  var pos = this.layer._map.latLngToLayerPoint(this.model.get('geojson').coordinates);
  L.DomUtil.setPosition(el, pos);
}

