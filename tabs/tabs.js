$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = this.$el.data('content-tabs');
  this.$activeTab = $(this.$contentTabs).find(".active");
  this.$el.on('click', 'a', function(event) {
    this.clickTab(event);
  }.bind(this));
};

$.Tabs.prototype.clickTab = function(event) {
  event.preventDefault();
  $('a.active').removeClass('active');
  this.$activeTab.removeClass('active');
  this.$activeTab.addClass('transitioning');
  this.$activeTab.one('transitionend', function () {
    this.$activeTab.removeClass('transitioning');
    var $target = $(event.currentTarget).addClass('active');
    this.$activeTab = $($target.attr('href'))
                               .addClass('active').addClass('transitioning');
    setTimeout(function () {
      this.$activeTab.removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));
};

$.fn.tabs = function () {
  return this.each(function (){
    new $.Tabs(this);
  });
};
