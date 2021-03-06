// AlertView module
define(function(require) {
  var tpl = require('text!/templates/misc/alert.jst.ejs');

  var AlertView = Backbone.View.extend({

    template: _.template(tpl),

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
      var html = this.template({
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

  return AlertView;
});
