App.BankAccountView = Backbone.View.extend({

  // events: {
  // },

  initialize: function (options) {

  },

  render: function() {
    var template = App.util.getTemplate('bank_accounts/detail');
    $(this.el).html(template({model: this.model}));
    this.renderSubviews();
    return this;
  },

  renderSubviews: function() {
    var config = {
      bankId: this.model.get('id'),
      parentView: this
    };

    this.graphView = new App.BankAccountGraphView(config);
    this.graphView.render();

    this.transactionsView = new App.BankTransactionListView(config);
    this.graphView.render();

    this.bankAccountFormView = new App.BankAccountFormView(config);
    this.bankAccountFormView.render();

    this.importView = new App.ImportView(config);
    this.importView.render();
  }

});
