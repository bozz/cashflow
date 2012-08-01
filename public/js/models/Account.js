// Account module
define(function(require) {

  var Account = Backbone.Model.extend({

    toJSON: function() {
      return { account: _.clone( this.attributes ) }
    }

  });

  return Account;
});
