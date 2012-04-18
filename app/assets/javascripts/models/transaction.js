App.Transaction = Backbone.Model.extend({

  toJSON: function() {
    return { transaction: _.clone( this.attributes ) }
  }

});
