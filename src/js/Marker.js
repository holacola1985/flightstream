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
  drawPathToMarker: drawPathToMarker,
  getHeight: getHeight,
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
  this.$line = this.$('.drone-floor-path');
  this.$path = this.$('.drone-aerial-path');
  this.setPosition();
  this.setHeight();
}

function getHeight() {
  return m2px.convertMeterInPixel(
    this.model.get('data').altitude,
    this.model.get('geojson').coordinates[0],
    this.layer._map.getZoom()
  );
}

function drawPathToMarker(m2) {
  this._distMarker = m2;
  var m1 = this;
  var y1 = m1.position.y;
  var x1 = m1.position.x;
  var z1 = m1.getHeight();
  var y2 = m2.position.y;
  var x2 = m2.position.x;
  var z2 = m2.getHeight();

  var dx = x1 - x2;
  var dy = y1 - y2;
  var dz = z1 - z2;
  var floor_dist = Math.sqrt(dx * dx + dy * dy);
  var dist = Math.sqrt(floor_dist * floor_dist + dz * dz);

  var alpha = Math.atan(dx / dy) / Math.PI * 180;
  if (dy > 0) {
    alpha = -(alpha + 90);
  } else {
    alpha = 90 - alpha;
  }
  var gamma = Math.atan(dz / floor_dist) / Math.PI * 180;

  var cssTransform = [
    'rotateZ(' + alpha + 'deg)',
    'translate3d(' + [0, 0, 0].join('px,') + 'px)',
  ].join(' ');
  this.$line.css({
    width: floor_dist,
    transform: cssTransform
  });

  var cssTransformAerial = [
    'translateZ(' + z1 + 'px)',
    'rotateX(' + gamma + 'deg)',
    'rotateZ(' + alpha + 'deg)',
  ].join(' ');
  this.$path.css({
    width: dist,
    transform: cssTransformAerial
  });
}

function setHeight() {
  var height = this.getHeight();
  this.height = $('.altitude', this.$el).css({
    height: height + 'px',
    transform: 'rotateX(-90deg) translateY(-' + height + 'px)'
  });
  if (this._distMarker) {
    this.drawPathToMarker(this._distMarker);
  }
}

function setPosition() {
  var el = this.$el[0];
  this.position = this.layer._map.latLngToLayerPoint(this.model.get('geojson').coordinates);
  L.DomUtil.setPosition(el, this.position);
}
