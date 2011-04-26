App.Views.TransactionDetail = Backbone.View.extend({
  events: {
    "submit form": "save"
  },

  initialize: function(config) {
    this.parent = config.parent;

    // add dialog div
    $('body').append("<div style='display: none;' id='edit-transaction-dialog'></div>");
    $('#edit-transaction-dialog').dialog({
      autoOpen: false,
      title: 'Transaktion erstellen',
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

    var data = { transaction: {} };
    this.$('form input, form textarea').each(function (i, field) {
      data.transaction[field.name] = field.value;
    });

    this.model.save(data, {
      success: function(model, resp) {
        //console.log("save response:  ", model, resp, msg);
        //new App.Views.Notice({ message: msg });

        self.model = model;

        //Backbone.history.saveLocation('transactions/' + model.id);

        $('#edit-transaction-dialog').dialog('close');

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
    $(this.el).html(JST['transactions/detail']({ model: this.model }));

    $('#edit-transaction-dialog').dialog('open');

    $('#edit-transaction-dialog #date-field').datepicker({
      dateFormat: 'dd.mm.yy',
      showOn: 'both'
    });

    $('#edit-transaction-dialog button').button();
  }
});


