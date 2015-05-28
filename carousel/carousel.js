$.Carousel = function(el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.transitioning = false;
  $('div.items').children().eq(this.activeIdx).addClass('active');
  $('.slide-left').on('click', function (event) {
    this.slide(1);
  }.bind(this));
  $('.slide-right').on('click', function (event) {
    this.slide(-1);
  }.bind(this));};

$.Carousel.prototype.slide = function(dir) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;

  var newClass, oldClass;
  if (dir === 1) {
    newClass = 'right';
    oldClass = 'left';
  } else {
    newClass = 'left';
    oldClass = 'right';
  }

  $('.active').addClass(oldClass).one('transitionend', function () {
    $('.' + oldClass).removeClass('active').removeClass(oldClass);
    this.transitioning = false;
  }.bind(this));

  this.activeIdx += dir;
  this.activeIdx = this.activeIdx % $('.items img').length;
  $('div.items').children().eq(this.activeIdx).addClass('active');

  $('.active').addClass(newClass);
  setTimeout(function() {
    $('.' + newClass).removeClass(newClass);
  }, 0);
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
