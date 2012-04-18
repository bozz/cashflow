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
    return this;
  }

});
