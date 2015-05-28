$.Thumbnails = function(el) {
  this.$el = $(el);
  this.gutterIdx = 0;
  this.$images = $('.gutter-images').children();
  this.$activeImg = $('.gutter-images').children().eq(0);

  this.activate(this.$activeImg);
  this.createEventHandlers();
  this.fillGutterImages();
};

$.Thumbnails.prototype.activate = function ($img) {
  $('.active').empty();
  $('.active').append($img.clone());
};

$.Thumbnails.prototype.createEventHandlers = function () {
  $('.gutter-images').on('click', 'img', function (event) {
    var $img = $(event.currentTarget);
    this.$activeImg = $img;
    this.activate($img);
  }.bind(this));

  $('.gutter-images').on('mouseenter', 'img', function (event) {
    this.activate($(event.currentTarget));
  }.bind(this));

  $('.gutter-images').on('mouseleave', 'img', function (event) {
    this.activate(this.$activeImg);
  }.bind(this));

  $('a.nav').on('click', function(event) {
    if ($(event.currentTarget).attr('id') === 'left') {
      this.gutterIdx -= 1;
    } else {
      this.gutterIdx += 1;
    }
    this.fillGutterImages();
  }.bind(this));
};

$.Thumbnails.prototype.fillGutterImages = function () {
  $('.gutter-images').children().remove();
  var startIdx;
  if (this.gutterIdx >= 0) {
    startIdx = this.gutterIdx % this.$images.length;
  } else {
    startIdx = this.$images.length + (this.gutterIdx % this.$images.length);
  }

  var $slicedImages = this.$images.slice(startIdx, startIdx + 5);
  var $gutterImages = $.merge($slicedImages,
                              this.$images.slice(0, 5 - $slicedImages.length));
  $slicedImages.appendTo('.gutter-images');
};

$.fn.thumbnails = function() {
  return this.each(function() {
    new $.Thumbnails(this);
  });
};
