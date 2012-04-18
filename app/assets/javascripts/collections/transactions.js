App.Transactions = Backbone.Collection.extend({

  model: App.Transaction,

  url: '/api/transactions'

});
