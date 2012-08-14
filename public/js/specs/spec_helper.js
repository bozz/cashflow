beforeEach(function() {

  this.fixtures = {
    BankAccounts: {
      valid: { // response starts here
        "status": "OK",
        "version": "1.0",
        "response": [{
          "id": 1,
          "account_number": 1234567,
          "bank": "BigBank",
          "name": "BigBank",
          "currency": "EUR",
          "initial_cents": 0
        }, {
          "id": 2,
          "account_number": 9876543,
          "bank": "Bank of Mud",
          "name": "Bank of Mud",
          "currency": "EUR",
          "initial_cents": 100000
        }]
      }
    }

  };

  this.validResponse = function(responseText) {
    return [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(responseText)
    ];
  };

});


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
