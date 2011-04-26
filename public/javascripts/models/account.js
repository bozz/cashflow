var Account = Backbone.Model.extend({
  url: function() {
    var base = 'accounts';
    if (this.isNew()) { return base; }
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  }
});


App.Collections.Accounts = Backbone.Collection.extend({
  model: Account,
  url: '/accounts'
});
