define(function(require) {
  var Backbone = require('backbone');
  var utils = require('utils');
  var tpl = require('text!/templates/bank_accounts/detail.jst.ejs');
  var BankAccountGraphView = require('views/bank_account/graph');
  var BankTransactionListView = require('views/bank_transactions/index');
  var BankAccountFormView = require('views/bank_account/form');
  var ImportView = require('views/bank_transactions/import');

  var BankAccountView = Backbone.View.extend({

    template: _.template(tpl),

    initialize: function (options) {

    },

    render: function() {
      $(this.el).html(this.template({model: this.model}));
      this.renderSubviews();
      return this;
    },

    renderSubviews: function() {
      var config = {
        bankId: this.model.get('id'),
        parentView: this
      };

      this.graphView = new BankAccountGraphView(config);
      this.graphView.render();

      this.transactionsView = new BankTransactionListView(config);
      this.graphView.render();

      this.bankAccountFormView = new BankAccountFormView(config);
      this.bankAccountFormView.render();

      this.importView = new ImportView(config);
      this.importView.render();
    }

  });

  return BankAccountView;
});
