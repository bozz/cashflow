App.BankTransaction = Backbone.Model.extend({

  toJSON: function() {
    return { bank_transaction: _.clone( this.attributes ) }
  }

});
