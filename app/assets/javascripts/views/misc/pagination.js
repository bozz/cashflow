App.PaginationView = Backbone.View.extend({

  template: JST['misc/pagination'],

  tagName: 'ul',

  events: {
    'click a.servernext': 'nextResultPage',
    'click a.serverprevious': 'previousResultPage',
    'click a.page': 'gotoPage'
    // 'click a.orderUpdate': 'updateSortBy',
    // 'click a.serverlast': 'gotoLast',
    // 'click a.serverfirst': 'gotoFirst',
  },

  initialize: function (options) {
    this.parentView = options.parentView;
    // this.collection.on('reset', this.render, this);
    // this.collection.on('change', this.render, this);
  },

  render: function () {
    var html = this.template(this.collection.info());
    $('div.pagination', this.parentView.el).html(this.$el.html(html));
    this.delegateEvents();
    return this;
  },

  updateSortBy: function (e) {
    e.preventDefault();
    var currentSort = $('#sortByField').val();
    this.collection.updateOrder(currentSort);
  },

  nextResultPage: function (e) {
    e.preventDefault();
    if(this.collection.currentPage < this.collection.totalPages) {
      this.collection.requestNextPage();
    }
  },

  previousResultPage: function (e) {
    e.preventDefault();
    if(this.collection.currentPage > 1) {
      this.collection.requestPreviousPage();
    }
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
