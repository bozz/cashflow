App.Transactions = Backbone.Paginator.requestPager.extend({

  model: App.Transaction,

  url: '/api/transactions',

  // @param-name for the query field in the 
  // request (e.g query/keywords/search)
  queryAttribute: 'q',

  // @param-name for number of items to return per request/page
  perPageAttribute: 'limit',

  // @param-name for how many results the request should skip ahead to
  skipAttribute: 'offset',

  // @param-name for the direction to sort in
  sortAttribute: 'sort',

  // @param-name for field to sort by
  orderAttribute: 'orderBy',

  // @param-name for the format of the request
  formatAttribute: 'json',

  // default values
  page: 0,
  firstPage: 0,
  perPage: 20,
  sortField: 'name',
  sortDirection: 'asc',
  query: "",

  // overwrite from backbone.paginator
  sync: function ( method, model, options ) {
    var queryMap = {}, params;
    queryMap[this.perPageAttribute] =  this.perPage;
    queryMap[this.skipAttribute] = this.page * this.perPage;
    queryMap[this.orderAttribute] =  this.sortField;
    queryMap[this.queryAttribute] =  this.query;

    params = _.extend({
      type: 'GET',
      dataType: 'json',
      data: decodeURIComponent($.param(queryMap)),
      url: this.url,
      processData: false
    }, options);

    params.error = function(xhr, status, error) {
      console.log("Error loading collection:", xhr, status, error);
    };

    return $.ajax(params);
  },


  // overwrite parse (backbone) to extract results
  parse: function (response) {
    var data = response.data;
    this.totalPages = Math.floor(response.count / this.perPage);
    return data;
  }

});
