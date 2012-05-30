App.TransactionsListView = Backbone.View.extend({

  template: JST['transactions/index'],

  events: {
    'click button.btn-new': 'newTransaction',
    'click button.btn-edit': 'editTransaction',
    'click button.btn-delete': 'deleteTransaction',
    'submit form.form-search': 'filterTransactions'
  },

  initialize: function() {
    App.transactions.totalPages = Math.floor(App.transactions.length / this.perPage);
    App.transactions.pager();

    this.paginationView = new App.TransactionsPaginationView({
      collection: App.transactions,
      parentView: this
    });

    App.transactions.on('reset', this.render, this);
    App.transactions.on('add', this.render, this);
    App.transactions.on('change', this.render, this);
    App.transactions.on('destroy', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({transactions: App.transactions}));
    this.paginationView.render();

    // set any previous filter values
    // TODO: extract filter form into seperate template
    $('form.form-search input.search-query').val(App.transactions.filterExpression);
    $('form.form-search select').val(App.transactions.filterBankAccount);

    return this;
  },

  newTransaction: function(event) {
    var model = new App.Transaction();
    this.showTransactionsDetail(model);
  },

  editTransaction: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.transactions.get(id);
    this.showTransactionsDetail(model);
  },

  showTransactionsDetail: function(model) {
    event.preventDefault();

    view = new App.TransactionView({model: model});
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
            console.log("successfully destroyed", model);
          }
        });
      }
    });
  },

  filterTransactions: function(event) {
    event.preventDefault();

    var q = $('form.form-search input.search-query').val();
    var bankAccountId = $('form.form-search select').val();

    // workaround: if bank_account selected but no query specified
    if(bankAccountId > 0 && q == "") {
      q = " ";
    }

    App.transactions.setFilter(['amount', 'description'], q, bankAccountId);
  }

});
