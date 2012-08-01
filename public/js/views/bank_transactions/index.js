define(function(require) {
  var Backbone = require('backbone');
  var utils = require('utils');
  var tpl = require('text!/templates/bank_transactions/index.jst.ejs');
  var BankTransaction = require('models/BankTransaction');
  var BankTransactions = require('collections/BankTransactions');
  var BankTransactionView = require('views/bank_transactions/detail');
  var PaginationView = require('views/misc/pagination');

  var BankTransactionListView = Backbone.View.extend({

    // ID of current bank_account
    bankId: false,

    template: _.template(tpl),

    events: {
      'click button.btn-new': 'newTransaction',
      'click button.btn-edit': 'editTransaction',
      'click button.btn-delete': 'deleteTransaction',
      'submit form.form-search': 'filterTransactions'
    },

    initialize: function(config) {
      this.parentView = config.parentView;
      this.bankId = config.bankId;

      this.collection = new BankTransactions({bankId: this.bankId});
      this.collection.pager();

      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.render, this);
      this.collection.on('change', this.render, this);
      this.collection.on('destroy', this.render, this);

      this.paginationView = new PaginationView({
        collection: this.collection,
        parentView: this
      });
    },

    render: function() {
      this.$el.html(this.template({bankId: this.bankId, transactions: this.collection}));
      $('#tab-transactions', this.parentView.el).html(this.el);

      // set any previous filter values
      // TODO: extract filter form into seperate template
      this.$el.find('form.form-search input.search-query').val(this.collection.server_api.q);

      this.paginationView.render();

      this.delegateEvents();

      return this;
    },

    newTransaction: function(event) {
      var model = new BankTransaction();
      this.showTransactionsDetail(model);
    },

    editTransaction: function(event) {
      var id = $(event.currentTarget).attr('value');
      var model = this.collection.get(id);
      this.showTransactionsDetail(model);
    },

    showTransactionsDetail: function(model) {
      event.preventDefault();

      view = new TransactionView({bankId: this.bankId, model: model});
      $('#content').append(view.render().el);
      $('#transaction-modal').modal();
    },

    deleteTransaction: function(event) {
      var id = $(event.currentTarget).attr('value');
      var model = this.collection.get(id);

      bootbox.confirm("Do you really want to delete this transaction?", "Cancel", "Confirm Delete", function(result) {
        if (result) {
          model.destroy({
            success: function(model, response) {
              utils.alertSuccess('Item deleted successfully');
            }
          });
        }
      });
    },

    filterTransactions: function(event) {
      event.preventDefault();

      var q = this.$el.find('form.form-search input.search-query').val();
      this.collection.applyFilter(q);
    }

  });

  return BankTransactionListView;
});
