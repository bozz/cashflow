App.AlertView = Backbone.View.extend({

  events: {
    'mouseover div.alert': 'stopTimer',
    'mouseout div.alert': 'startTimer',
    'closed div.alert': 'alertClosed'
  },

  initialize: function (options) {
    this.title = options.title;
    this.msg = options.msg;
    this.alertClass = options.alertClass;
    this.timer = false;
  },

  render: function() {
    var template = App.util.getTemplate('misc/alert');
    var html = template({
      alertClass: this.alertClass,
      title: this.title,
      msg: this.msg
    });
    $('#alerts').append(this.$el.html(html));

    this.startTimer();

    return this;
  },

  stopTimer: function(event) {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  },

  startTimer: function(event) {
    var self = this;
    this.timer = setTimeout(function() {
      $('.alert', self.$el).alert('close');
    }, 4000);
  },

  alertClosed: function(event) {
    this.remove();
  }

});
