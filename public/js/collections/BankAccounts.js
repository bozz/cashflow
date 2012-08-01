// BankAccounts (Collection) module
define(function(require) {
  var BankAccount = require('model/BankAccount');

  var BankAccounts = Backbone.Collection.extend({
    model: BankAccount,
    url: '/api/banks/'
  });

  return BankAccounts;
});
