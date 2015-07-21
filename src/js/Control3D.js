"use strict";
var $ = require('jquery');

function Control3D(options) {
  this.map = options.map;
  this.$map = $(this.map._container);
  this.el = options.el;
  this.$el = $(this.el);
  this.isIn3d = false;
  this.$el.click(this.toggle.bind(this));
}

Control3D.prototype.set3dMode = function set3dMode() {
  this.$map.addClass('pers');
  this.isIn3d = true;
};

Control3D.prototype.setNormalMode = function setNormalMode() {
  this.$map.removeClass('pers');
  this.isIn3d = false;
};

Control3D.prototype.toggle = function toggle(e) {
  e.preventDefault();
  if(this.isIn3d){
    this.setNormalMode(); 
  }else{
    this.set3dMode();
  }
};


module.exports = Control3D;
