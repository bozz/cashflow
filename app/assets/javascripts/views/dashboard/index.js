App.DashboardView = Backbone.View.extend({

  events: {
    // 'click button.btn-new': 'newTransaction',
    // 'click button.btn-edit': 'editTransaction',
    // 'click button.btn-delete': 'deleteTransaction',
  },

  initialize: function() {
  },

  render: function() {
    var template = App.util.getTemplate('dashboard/index');
    $(this.el).html(template());
    // var graphView = new App.TransactionsGraphView({collection: App.transactions, targetEl: 'graph'});
    // $(this.el).append(graphView.render().el);
    return this;
  }

});
