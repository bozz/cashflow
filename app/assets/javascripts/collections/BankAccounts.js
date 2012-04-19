App.BankAccounts = Backbone.Collection.extend({

  model: App.BankAccount,

  url: '/api/bank-accounts'

});
