App.Views.AccountDetail = Backbone.View.extend({
  events: {
    "submit form": "save"
  },

  initialize: function(config) {
    this.parent = config.parent;

    // add dialog div
    $('body').append("<div style='display: none;' id='edit-account-dialog'></div>");
    $('#edit-account-dialog').dialog({
      autoOpen: false,
      title: 'Konto erstellen',
      modal: true,
      width: 600
    }).html(this.el);

    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.render();
  },

  save: function() {
    var self = this;
    var isNew = this.model.isNew();
    var msg = isNew ? 'Successfully created!' : "Saved!";

    var data = { account: {} };
    this.$('form input, form textarea').each(function (i, field) {
      data.account[field.name] = field.value;
    });

    this.model.save(data, {
      success: function(model, resp) {
        //console.log("save response:  ", model, resp, msg);
        //new App.Views.Notice({ message: msg });

        self.model = model;

        //Backbone.history.saveLocation('transactions/' + model.id);

        $('#edit-account-dialog').dialog('close');

        if(isNew) {
          self.parent.collection.add(model);
        } else {
          self.parent.render();
          self.parent.delegateEvents();
        }
      },
      error: function() {
        new App.Views.Error();
      }
    });

    return false;
  },

  render: function() {
    $(this.el).html(JST['accounts/detail']({ model: this.model }));

    $('#edit-account-dialog').dialog('open');

    $('#edit-account-dialog button').button();
  }
});



