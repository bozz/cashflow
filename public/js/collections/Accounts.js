// Accounts (Collection) module
define(function(require) {
  var Account = require('models/Account');

  var Accounts = Backbone.Collection.extend({
    model: Account,
    url: '/api/accounts'
  });

  return Accounts;
});
