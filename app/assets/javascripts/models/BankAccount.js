App.BankAccount = Backbone.Model.extend({

  toJSON: function() {
    return { bank_account: _.clone( this.attributes ) }
  }

});
