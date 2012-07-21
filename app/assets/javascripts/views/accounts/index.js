App.AccountsListView = Backbone.View.extend({

  events: {
    'click button.btn-new': 'newAccount',
    'click button.btn-edit': 'editAccount',
    'click button.btn-delete': 'deleteAccount'
  },

  initialize: function() {
    App.accounts.on('reset', this.render, this);
    App.accounts.on('add', this.render, this);
    App.accounts.on('change', this.render, this);
    App.accounts.on('destroy', this.render, this);
  },

  render: function() {
    var template = App.util.getTemplate('accounts/index');
    $(this.el).html(template({accounts: App.accounts}));
    return this;
  },

  newAccount: function(event) {
    var model = new App.Account();
    this.showAccountDetail(model);
  },

  editAccount: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.accounts.get(id);
    this.showAccountDetail(model);
  },

  showAccountDetail: function(model) {
    event.preventDefault();

    view = new App.AccountView({model: model});
    $('#content').append(view.render().el);
    $('#account-modal').modal();
  },

  deleteAccount: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.accounts.get(id);

    bootbox.confirm("Do you really want to delete this account?", "Cancel", "Confirm Delete", function(result) {
      if (result) {
        model.destroy({
          success: function(model, response) {
            console.log("successfully destroyed", model);
          }
        });
      }
    });
  }

});
