describe('BankAccountFormView', function() {

  beforeEach(function() {
    var BankAccountFormView = testr('views/bank_account/form');
    this.view = new BankAccountFormView();
  });

  describe("Instantiation", function() {

    it("should create a list element", function() {
      expect(this.view.el.nodeName).toEqual("DIV");
    });

    it("should have a class of 'todos'", function() {
      // expect($(this.view.el)).toHaveClass('todos');
    });

  });

});
