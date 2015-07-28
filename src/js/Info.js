"use strict";
var _ = require('lodash');
var Backbone = require('backbone');
var template = require('./info.hbs');

module.exports = Backbone.View.extend({
  render: render
});

function render(model){
  var data = _.pick(model.get('data'),[
    'thumbnail',
    'altitude',
    'speed',
    'battery'
  ]);
  var battery = model.get('data').battery;
  if(battery){
    battery = parseFloat(battery.replace('%', ''));
    if(battery < 15){
      data.battery_color = 'red'; 
    }else if(battery < 40){
      data.battery_color = 'orange'; 
    }else{
      data.battery_color = 'green';
    }
  }
  this.$el.html(template(data));
}
