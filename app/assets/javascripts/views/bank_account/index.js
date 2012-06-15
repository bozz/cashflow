App.BankAccountListView = Backbone.View.extend({

  template: JST['bank_accounts/index'],

  events: {
    'click button.btn-new': 'newAccount',
    'click button.btn-edit': 'editAccount',
    'click button.btn-delete': 'deleteAccount'
  },

  initialize: function() {
    App.bankAccounts.on('reset', this.render, this);
    App.bankAccounts.on('add', this.render, this);
    App.bankAccounts.on('change', this.render, this);
    App.bankAccounts.on('destroy', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({accounts: App.bankAccounts}));
    return this;
  },

  newAccount: function(event) {
    var model = new App.BankAccount();
    this.showAccountDetail(model);
  },

  editAccount: function(event) {
    // var id = $(event.currentTarget).attr('value');
    // var model = App.bankAccounts.get(id);
    // this.showAccountDetail(model);
  },

  showAccountDetail: function(model) {
    event.preventDefault();

    view = new App.BankAccountView({model: model});
    $('#content').append(view.render().el);
    $('#account-modal').modal();
  },

  deleteAccount: function(event) {
    var id = $(event.currentTarget).attr('value');
    var model = App.bankAccounts.get(id);

    bootbox.confirm("Do you really want to delete this bank account?", "Cancel", "Confirm Delete", function(result) {
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
