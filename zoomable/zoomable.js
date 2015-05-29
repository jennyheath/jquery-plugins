$.Zoomable = function (el) {
  this.$el = $(el);
  this.boxSize = 100;
  this.bindEvents();
  this.$focusBox = null;
  this.$zoomedImage = null;
};

$.Zoomable.prototype.bindEvents = function () {
  this.$el.on('mouseenter', 'img', function (event) {
    this.showFocusBox(event);
  }.bind(this));

  this.$el.on('mouseleave', 'img', function (event) {
    this.removeFocusBox();
  }.bind(this));

  this.$el.on('mousemove', 'img', function (event) {
    this.moveFocusBox(event);
    this.moveZoomedImage(event);
  }.bind(this));
};

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  if (!this.$zoomedImage) {
    this.$zoomedImage = $('<div>').addClass('zoomed-image').appendTo('body');
    this.$zoomedImage.css('width', $(window).height() + 'px');
    this.$zoomedImage.css('background-image', 'url(' + $('img').attr('src') + ')');
    var imageHeight = ($(window).height)*4;
    var imageWidth = ($(window).height)*2.25;
    this.$zoomedImage.css('background-size', imageWidth + 'px ' + imageHeight + 'px');
    this.$zoomedImage.css('background-position', -xDiff*4 + 'px ' + -yDiff*2.25 + 'px');
  }
};

$.Zoomable.prototype.moveZoomedImage = function (event) {
  this.$zoomedImage.css('background-position', -event.pageX*4 + 'px ' + -event.pageY*2.25 + 'px');
}

$.Zoomable.prototype.moveFocusBox = function (event) {
  this.$focusBox.css('left', event.pageX + 'px').css('top', event.pageY + 'px');
};

$.Zoomable.prototype.showFocusBox = function(event) {
  if (!this.$focusBox) {
    this.$focusBox = $('<div>').addClass('focus-box').appendTo(this.$el);
  }
  this.$focusBox.css('left', event.pageX + 'px').css('top', event.pageY + 'px');
  this.showZoom(event.pageX, event.pageY);
};

$.Zoomable.prototype.removeFocusBox = function(event) {
  this.$focusBox.remove();
  this.$focusBox = null;
  this.$zoomedImage.remove();
  this.$zoomedImage = null;
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
