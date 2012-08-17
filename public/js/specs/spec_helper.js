
// Factory module for creating generic models with prefilled data 
// and for creating predefined responses
var Factory = (function() {
  var models = {
    BankAccount: [{
      'id': 1,
      'account_number': 1234567,
      'bank': 'BigBank',
      'name': 'BigBank',
      'currency': 'EUR',
      'initial_cents': 0
    }, {
      'id': 2,
      'account_number': 9876543,
      'bank': 'Bank of Mud',
      'name': 'Bank of Mud',
      'currency': 'EUR',
      'initial_cents': 100000
    }]
  };

  var responses = {
    BankAccount: {
      valid: {
        'status': 'OK',
        'version': '1.0',
        'response': models.BankAccount[0]
      }
    },
    BankAccounts: {
      valid: { // response starts here
        'status': 'OK',
        'version': '1.0',
        'response': models.BankAccount
      }
    }
  };

  var wrapResponse = function(response, status) {
    var statusMapping = { 'valid': 200 }
    return [
      statusMapping[status],
      {"Content-Type": "application/json"},
      JSON.stringify(response.response)
    ];
  }

  return {
    createModel: function(name) {
      if(models[name]) {
        return new Backbone.Model(_.first(models[name]));
      } else {
        console.warn("Warning: 'createmodel' failed for: ", name);
        return new Backbone.Model();
      }
    },
    createResponse: function(name, status) {
      if(responses[name] && responses[name][status]) {
        var response = responses[name][status];
        return {
          raw: response,
          wrapped: wrapResponse(response, status)
        }
      } else {
        console.warn("Warning: 'createResponse' failed for: ", name, status);
        return [];
      }
    }
  }
}())


// see http://cederwall.cem/p/teiyewch(function() {
function createContext(stubs) {

  /**
   * create a new map which will override the path to a given dependencies
   * so if we have a module in m1, requiresjs will look now unter   
   * stub_m1
   **/
  var map = {}, key;

  // _.each(stubs, function (value, key) {
  for(key in stubs) {
    var stubname = 'stub_' + key;
    map[key] = stubname;
  };

  /**
   * create a new context with the new dependency paths
   **/
  var context =  require.config({
    context: "context_" + Math.floor(Math.random() * 1000000),
    // map: {
    //   "*": map
    // }
  });

  /**
   * create new definitions that will return our passed stubs or mocks
   **/
  // _.each(stubs, function (value, key) {
  for(key in stubs) {
    var stubname = 'stub_' + key;

    define(stubname, function () {
      return stubs[key];
    });

  };

  return context;
}
