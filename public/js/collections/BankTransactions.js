// BankTransactions (Collection) module
define(function(require) {
  var BaseCollection = require('collections/BaseCollection');
  var BankTransaction = require('models/BankTransaction');

  var BankTransactions = BaseCollection.extend({
    model: BankTransaction,

    defaultOrder: 'date DESC',

    initialize: function(config) {
      this.bankId = config.bankId;
    },

    url: function() {
      return '/api/banks/' + this.bankId + '/transactions';
    }

  });

  return BankTransactions;
});
