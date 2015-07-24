"use strict";
var Backbone = require('backbone');
var template = require('./info.hbs');

module.exports = Backbone.View.extend({
  render: render
});

function render(model){
  this.$el.html(template({
    src: model.get('data').thumbnail,
    altitude: model.get('data').altitude,
    lat: model.getCoordinates()[0],
    lng: model.getCoordinates()[1]
  }));
}
