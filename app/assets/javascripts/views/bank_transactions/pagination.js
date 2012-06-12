App.TransactionsPaginationView = Backbone.View.extend({

  template: JST['bank_transactions/pagination'],

  tagName: 'ul',

  events: {
    'click a.servernext': 'nextResultPage',
    'click a.serverprevious': 'previousResultPage',
    // 'click a.orderUpdate': 'updateSortBy',
    // 'click a.serverlast': 'gotoLast',
    'click a.page': 'gotoPage'
    // 'click a.serverfirst': 'gotoFirst',
    // 'click a.serverpage': 'gotoPage',
    // 'click .serverhowmany a': 'changeCount'
  },

  initialize: function (options) {
    this.parentView = options.parentView;
    // this.collection.on('reset', this.render, this);
    // this.collection.on('change', this.render, this);
  },

  render: function () {
    console.log("info:", this.collection.info());
    var html = this.template(this.collection.info());
    $('div.pagination', this.parentView.el).html(this.$el.html(html));
    this.delegateEvents();
  },

  updateSortBy: function (e) {
    e.preventDefault();
    var currentSort = $('#sortByField').val();
    this.collection.updateOrder(currentSort);
  },

  nextResultPage: function (e) {
    e.preventDefault();
    this.collection.nextPage();
  },

  previousResultPage: function (e) {
    e.preventDefault();
    this.collection.previousPage();
  },

  gotoFirst: function (e) {
    e.preventDefault();
    this.collection.goTo(this.collection.information.firstPage);
  },

  gotoLast: function (e) {
    e.preventDefault();
    this.collection.goTo(this.collection.information.lastPage);
  },

  gotoPage: function (e) {
    e.preventDefault();
    var page = $(e.target).text();
    this.collection.goTo(page);
  },

  changeCount: function (e) {
    e.preventDefault();
    var per = $(e.target).text();
    this.collection.howManyPer(per);
  }

});