Cashflow.Views.TransactionsIndex = Backbone.View.extend({

  template: JST['transactions/index'],

  initialize: function() {
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({transactions: this.collection}));
    return this;
  }

});
