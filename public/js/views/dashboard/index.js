define(function(require) {
  var Backbone = require('backbone');
  var tpl = require('text!/templates/dashboard/index.jst.ejs');

  var DashboardView = Backbone.View.extend({

    template: _.template(tpl),

    close: function() {
      this.remove();
      this.unbind();
    },

    render: function() {
      this.$el.html(this.template());

      // var graphView = new App.TransactionsGraphView({collection: App.transactions, targetEl: 'graph'});
      // $(this.el).append(graphView.render().el);
      return this;
    }

  });

  return DashboardView;
});
