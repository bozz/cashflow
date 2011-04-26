App.Views.TransactionList = Backbone.View.extend({

  events: {
    'click #new-transaction-btn': 'newTransaction',
    'click a.edit-transaction': 'editTransaction',
    'click a.delete-transaction': 'deleteTransaction'
  },

  initialize: function() {
    this.transactions = this.options.transactions;

    _.bindAll(this, 'render');
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
    this.render();
  },

  render: function() {
    var out = JST['transactions/list']({ collection: this.collection });
    $(this.el).html(out);
    $('#content').html(this.el);

    this.delegateEvents();

    $('#new-transaction-btn').button({
      icons: {primary: 'add-btn'}
    });
  },

  newTransaction: function() {
    new App.Views.TransactionDetail({ model: new Transaction(), parent: this });
    return false;
  },

  editTransaction: function(event) {
    var segs = event.currentTarget.href.split('/');
    var transaction = this.collection.get(segs.pop());
    new App.Views.TransactionDetail({ model: transaction, parent: this });
    return false;
  },

  deleteTransaction: function(event) {
    var segs = event.currentTarget.href.split('/');
    var transaction = this.collection.get(segs.pop());
    transaction.destroy();
    return false;
  }
});
