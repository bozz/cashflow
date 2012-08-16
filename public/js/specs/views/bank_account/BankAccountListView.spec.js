describe('BankAccountListView', function() {

  beforeEach(function() {
    var BankAccountListView = testr('views/bank_account/index.js');
    this.view = new BankAccountListView();
  });

  describe("Instantiation", function() {

    it("should create a list element", function() {
      expect(this.view.el.nodeName).toEqual("UL");
    });

    it("should have a class of 'todos'", function() {
      expect($(this.view.el)).toHaveClass('todos');
    });

  });

});
