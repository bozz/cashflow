Cashflow.Views.TransactionsIndex = Backbone.View.extend({

  template: JST['transactions/index'],

  render: function() {
    $(this.el).html(this.template());
    return this;
  }

});
