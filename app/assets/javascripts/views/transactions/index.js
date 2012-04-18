Cashflow.Views.TransactionsIndex = Backbone.View.extend({

  template: JST['transactions/index'],

  events: {
    'click button.btn-new': 'newTransaction',
    'click button.btn-edit': 'editTransaction',
    'click button.btn-delete': 'deleteTransaction',
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.render, this);
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({transactions: this.collection}));
    return this;
  },


  newTransaction: function(event) {
    var model = new Cashflow.Models.Transaction();
    this.showTransactionsDetail(model);
  },

  editTransaction: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = this.collection.get(id);
    this.showTransactionsDetail(model);
  },

  showTransactionsDetail: function(model) {
    event.preventDefault();

    view = new Cashflow.Views.TransactionsDetail({model: model, collection: this.collection});
    $('#content').append(view.render().el);
    $('#transaction-modal').modal();
  },

  deleteTransaction: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = this.collection.get(id);

    console.log("deleting...", model.id);

    // TODO: ask for confirmation before deleting...
    model.destroy();

    // TODO: use events to trigger render()
    this.render();
  }

});
