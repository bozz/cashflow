// BankAccount module
define(function(require) {
  var Backbone = require('backbone');

  var BankAccount = Backbone.Model.extend({

    toJSON: function() {
      return { bank_account: _.clone( this.attributes ) }
    }

  });

  return BankAccount;
});
