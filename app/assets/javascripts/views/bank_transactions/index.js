App.BankTransactionListView = Backbone.View.extend({

  // ID of current bank_account
  bankId: false,

  template: JST['bank_transactions/index'],

  events: {
    'click button.btn-new': 'newTransaction',
    'click button.btn-edit': 'editTransaction',
    'click button.btn-delete': 'deleteTransaction',
    'submit form.form-search': 'filterTransactions'
  },

  initialize: function(config) {
    this.parentView = config.parentView;
    this.bankId = config.bankId;

    App.transactions = new App.BankTransactions({bankId: this.bankId});
    App.transactions.pager();

    App.transactions.on('reset', this.render, this);
    App.transactions.on('add', this.render, this);
    App.transactions.on('change', this.render, this);
    App.transactions.on('destroy', this.render, this);

    this.paginationView = new App.PaginationView({
      collection: App.transactions,
      parentView: this
    });
  },

  render: function() {
    this.$el.html(this.template({bankId: this.bankId, transactions: App.transactions}));
    $('#tab-transactions', this.parentView.el).html(this.el);

    // set any previous filter values
    // TODO: extract filter form into seperate template
    this.$el.find('form.form-search input.search-query').val(App.transactions.server_api.q);

    this.paginationView.render();

    this.delegateEvents();

    return this;
  },

  newTransaction: function(event) {
    var model = new App.BankTransaction();
    this.showTransactionsDetail(model);
  },

  editTransaction: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.transactions.get(id);
    this.showTransactionsDetail(model);
  },

  showTransactionsDetail: function(model) {
    event.preventDefault();

    view = new App.TransactionView({bankId: this.bankId, model: model});
    $('#content').append(view.render().el);
    $('#transaction-modal').modal();
  },

  deleteTransaction: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.transactions.get(id);

    bootbox.confirm("Do you really want to delete this transaction?", "Cancel", "Confirm Delete", function(result) {
      if (result) {
        model.destroy({
          success: function(model, response) {
            App.util.alertSuccess('Item deleted successfully');
          }
        });
      }
    });
  },

  filterTransactions: function(event) {
    event.preventDefault();

    var q = this.$el.find('form.form-search input.search-query').val();
    App.transactions.applyFilter(q);
  }

});
