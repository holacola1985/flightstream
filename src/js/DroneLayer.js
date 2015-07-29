"use strict";
var _ = require('lodash');
//var $ = require('jquery');
require('mapbox.js');
var L = window.L;
var Marker = require('./Marker');


module.exports = L.Class.extend({
  options: {
    interactive: true,
    nonBubblingEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.collection.on('reset', this.resetMarkers);
    this.collection.on('add', this.appendMarker, this);
    this.collection.on('active', this.activateMarker, this);
    this.markers = [];
    this.markersById = {};
  },

  resetMarkers: function(){
    this.markers = [];
    this.markersById = {};
  },

  onAdd: function(map) {
    this._map = map;
    this._el = L.DomUtil.create('div', 'drone-layer leaflet-zoom-hide');
    map.getPanes().overlayPane.appendChild(this._el);
    map.on('viewreset', this._reset, this);
    this._reset();
  },

  onRemove: function(map) {
    map.getPanes().overlayPane.removeChild(this._el);
    map.off('viewreset', this._reset, this);
  },

  _reset: function() {
    _.each(this.markers, function(marker) {
      marker.setPosition();
    });
    _.each(this.markers, function(marker) {
      marker.setHeight();
    });
  },

  _animateZoom: function() {
    //TODO
    //should animated marker instead of use leaflet-zoom-hide
  },

  appendMarker: function(item) {
    if (item.get('geojson').coordinates[0] && item.get('geojson').coordinates[1]) {
      var marker = new Marker({
        model: item,
        layer: this
      });
      this.markers.push(marker);
      this.markersById[item.id] = marker;
      var from = this.getMarker(this.collection.at(this.collection.length - 2));
      var to = this.getMarker(this.collection.last());
      if(from && to){
        from.drawPathToMarker(to);
      }
    }
  },

  getMarker: function(model){
    return this.markersById[model.id];
  },

  activateMarker: function(model) {
    if (this._activeMarker) {
      this._activeMarker.$el.removeClass('on');
    }
    this._activeMarker = this.markersById[model.id];
    if (this._activeMarker) {
      this._activeMarker.$el.addClass('on');
    }

  }

});
