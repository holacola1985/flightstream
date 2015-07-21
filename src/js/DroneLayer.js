"use strict";
require('mapbox.js');
var $ = require('jquery');
var template = require('./marker.hbs');
var L = window.L;

var H = 10;

module.exports = L.Class.extend({

  initialize: function() {
  },

  onAdd: function(map) {
    this._map = map;
    this._el = L.DomUtil.create('div', 'drone-layer');
    map.getPanes().overlayPane.appendChild(this._el);
    map.on('viewreset', this._reset, this);
    this._reset();
  },

  onRemove: function(map) {
    map.getPanes().overlayPane.removeChild(this._el);
    map.off('viewreset', this._reset, this);
  },

  _reset: function() {

  },

  appendMarker: function(latLng) {
    H += 10;
    var html = template({
      height: H
    });
    var $node = $(html);
    var pos = this._map.latLngToLayerPoint(latLng);
    $node.css({
      top: pos.y,
      left: pos.x
    });
    $node.appendTo(this._el);    
  }

});
