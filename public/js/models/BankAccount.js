// BankAccount module
define(function(require) {

  var BankAccount = Backbone.Model.extend({
    defaults: {
      currency: 'EUR',
      inital_cents: 0
    },
    urlRoot: '/api/banks',
    toJSON: function() {
      return { bank_account: _.clone( this.attributes ) }
    }
  });

  return BankAccount;
});
