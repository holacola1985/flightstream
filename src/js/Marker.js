"use strict";
var $ = require('jquery');
var Backbone = require('backbone');
require('mapbox.js');
var L = window.L;
var template = require('./marker.hbs');
var m2px = require('./meterToPixel.js');

module.exports = Backbone.View.extend({
  className: 'drone-point',
  events: {
    'click': triggerActive
  },
  initialize: initialize,
  render: render,
  setHeight: setHeight,
  setPosition: setPosition
});

function initialize(options) {
  this.layer = options.layer;
  this.$el.appendTo(this.layer._el);
  this.render();
  this.setPosition();
}

function triggerActive() {
  this.model.trigger('active', this.model);
}

function render() {
  this.$el.html(template({}));
  this.setHeight();
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
