// BaseCollection module
define(function(require) {

  var BaseCollection = Backbone.Paginator.requestPager.extend({

    defaultOrder: 'name ASC',

    initialize: function(config) {
      this.initCustomApiParams();
    },

    // overwrite this function to set custom parameters
    initCustomApiParams: function() {
      // this.server_api.custom_param = function() { return this.customParam; }
    },

    // custom method for triggering remote filtering by search query
    applyFilter: function(query) {
      this.server_api.q = query;
      this.pager();
    },

    paginator_core: {
      type: 'GET',
      dataType: 'json',
      url: function() {
        return this.url();
      }
    },

    paginator_ui: {
      firstPage: 1,
      currentPage: 1,
      perPage: 20,
      totalPages: 10
    },

    server_api: {
      // the query field in the request
      q: '',

      // number of items to return per request/page
      per: function() { return this.perPage },
      page: function() { return this.currentPage },

      // how many results the request should skip ahead to
      // customize as needed. For the Netflix API, skipping ahead based on
      // page * number of results per page was necessary.
      // '$skip': function() { return this.currentPage * this.perPage },

      // field to sort by
      order: function() { return this.defaultOrder; }
    },

    // override parse (from backbone) to extract results
    parse: function (response) {
      var data = response.data;
      this.totalPages = Math.ceil(response.count / this.perPage);
      return data;
    },

    // override (from paginator) in order to add loading mask
    pager: function() {
      $("body").mask("Loading...");
      this.fetch({
        success: function(collection, response) {
          $("body").unmask();
        },
        error: function(collection, response) {
          $("body").unmask();
        }
      });
    }

  });

  return BaseCollection;
});
