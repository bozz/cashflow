var Transaction = Backbone.Model.extend({
  url: function() {
    var base = 'transactions';
    if (this.isNew()) { return base; }
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  }
});


App.Collections.Transactions = Backbone.Collection.extend({
  model: Transaction,
  url: '/transactions'
});
