// define(function(require) {
// 
//   var BankAccount = require('models/BankAccount');
// 
//   console.log("ZZZ:", BankAccount);
  // BankAccount = function() { console.log("aha") };

  describe("Bank Account model", function() {

    beforeEach(function() {
      var BankAccount = testr('models/BankAccount');
      this.bankAccount = new BankAccount({
        bank: "BigBank",
        name: "BigBankName",
        account_number: 1234567,
        currency: "EUR"
      });
      var collection = {
        url: "/api/banks"
      };
      this.bankAccount.collection = collection;
    });

    describe("when instantiated", function() {
      it("should exhibit attributes", function() {
        expect(this.bankAccount.get('bank')).toEqual("BigBank");
        expect(this.bankAccount.get('name')).toEqual("BigBankName");
        expect(this.bankAccount.get('account_number')).toEqual(1234567);
        expect(this.bankAccount.get('currency')).toEqual("EUR");
      });
    });

    describe("urls", function() {
      describe("when no id is set", function() {
        it("should return the collection URL", function() {
          expect(this.bankAccount.url()).toEqual("/api/banks");
        });
      });

      describe("when id is set", function() {
        it("should return the collection URL and id", function() {
          this.bankAccount.id = 1;
          expect(this.bankAccount.url()).toEqual("/api/banks/1");
        });
      });
    });

    describe("when saving", function() {

      beforeEach(function() {
        this.server = sinon.fakeServer.create();
        this.responseBody = '{"id":1,"account_number":53424666,"bank":"asdfasdf","created_at":"2012-05-09T08:20:51Z","currency":"EUR","description":"","initial_cents":0,"name":"BigBank","updated_at":"2012-06-27T14:48:00Z","opening_balance":0.0}';
        this.server.respondWith(
          "POST",
          "/api/banks",
          [
            200,
            {"Content-Type": "application/json"},
            this.responseBody
          ]
        );
        this.eventSpy = sinon.spy();
      });

      afterEach(function() {
        this.server.restore();
      });

      it("should make a save request to the server", function() {
        this.bankAccount.save();
        expect(this.server.requests[0].method).toEqual("POST");
        expect(this.server.requests[0].url).toEqual("/api/banks");
        expect(JSON.parse(this.server.requests[0].requestBody).bank_account).toEqual(this.bankAccount.attributes);
      });
    });
  });

// });
