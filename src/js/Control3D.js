"use strict";
var $ = require('jquery');

function Control3D(options) {
  this.map = options.map;
  this.$map = $(this.map._container);
  this.el = options.el;
  this.$el = $(this.el);
  this.$button = $('button', this.$el);
  this.$input = $('input', this.$el);
  this.isIn3d = false;
  this.$button.click(this.toggle.bind(this));
  this.$input.on('change', function() {
    this.rotate(this.$input.val());
  }.bind(this));
}

Control3D.prototype.set3dMode = function set3dMode() {
  this.$el.addClass('on');
  this.$map.addClass('pers');
  this.$map.css('transform', ' rotateX(70deg)');
  this.map.touchZoom.disable();
  this.map.doubleClickZoom.disable();
  this.map.scrollWheelZoom.disable();
  this.isIn3d = true;
};

Control3D.prototype.setNormalMode = function setNormalMode() {
  this.$el.removeClass('on');
  this.$map.removeClass('pers');
  this.$map.css('transform', 'translateY(0px) rotateX(0deg)');
  this.map.touchZoom.enable();
  this.map.doubleClickZoom.enable();
  this.map.scrollWheelZoom.enable();
  this.isIn3d = false;
};

Control3D.prototype.toggle = function toggle(e) {
  e.preventDefault();
  if (this.isIn3d) {
    this.setNormalMode();
  } else {
    this.set3dMode();
  }
};

Control3D.prototype.rotate = function rotate(angle) {
  this.$map.css('transform', 'translateY(50px) rotateX(70deg) rotateZ(' + angle + 'deg)');
};


module.exports = Control3D;
