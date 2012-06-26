App.DashboardView = Backbone.View.extend({

  template: JST['dashboard/index'],

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
