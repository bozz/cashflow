// BankAccounts (Collection) Singleton
define(function(require) {
  var BankAccount = require('models/BankAccount'),
      instance = null;

  var BankAccounts = Backbone.Collection.extend({
    model: BankAccount,
    url: '/api/banks/'
  });

  return {
    getInstance: function() {
      return instance = (instance || new BankAccounts());
    }
  }
});
