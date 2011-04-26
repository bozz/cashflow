App.Views.Dashboard = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    $(this.el).html( JST['main/dashboard']({}) );
    $('#content').html(this.el);
  }

});

