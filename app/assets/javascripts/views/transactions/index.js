App.TransactionsListView = Backbone.View.extend({

  template: JST['transactions/index'],

  events: {
    'click button.btn-new': 'newTransaction',
    'click button.btn-edit': 'editTransaction',
    'click button.btn-delete': 'deleteTransaction',
  },

  initialize: function() {
    App.transactions = new App.Transactions();
    App.transactions.fetch();
    App.transactions.on('reset', this.render, this);
    App.transactions.on('add', this.render, this);
    App.transactions.on('destroy', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({transactions: App.transactions}));
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
  }

});
