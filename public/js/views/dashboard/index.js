define(function(require) {
  var Backbone = require('backbone');
  var tpl = require('text!/templates/dashboard/index.jst.ejs');

  var DashboardView = Backbone.View.extend({

    template: _.template(tpl),

    events: {
      // 'click button.btn-new': 'newTransaction',
      // 'click button.btn-edit': 'editTransaction',
      // 'click button.btn-delete': 'deleteTransaction',
    },

    initialize: function() {
    },

    render: function() {
      $(this.el).html(this.template());

      // var graphView = new App.TransactionsGraphView({collection: App.transactions, targetEl: 'graph'});
      // $(this.el).append(graphView.render().el);
      return this;
    }

  });

  return DashboardView;
});
