App.Views.AccountList = Backbone.View.extend({

  events: {
    'click #new-account-btn': 'newAccount',
    'click a.edit-account': 'editAccount',
    'click a.delete-account': 'deleteAccount'
  },

  initialize: function() {
    this.accounts = this.options.accounts;

    _.bindAll(this, 'render');
    this.collection.bind('add', this.render);
    this.collection.bind('remove', this.render);
    this.render();
  },

  render: function() {
    var out = JST['accounts/list']({ collection: this.collection });
    $(this.el).html(out);
    $('#content').html(this.el);

    this.delegateEvents();

    $('#new-account-btn').button({
      icons: {primary: 'add-btn'}
    });
  },

  newAccount: function() {
    new App.Views.AccountDetail({ model: new Account(), parent: this });
    return false;
  },

  editAccount: function(event) {
    var segs = event.currentTarget.href.split('/');
    var account = this.collection.get(segs.pop());
    new App.Views.AccountDetail({ model: account, parent: this });
    return false;
  },

  deleteAccount: function(event) {
    var segs = event.currentTarget.href.split('/');
    var account = this.collection.get(segs.pop());
    account.destroy();
    return false;
  }
});

