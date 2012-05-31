App.Account = Backbone.Model.extend({

  toJSON: function() {
    return { account: _.clone( this.attributes ) }
  }

});
