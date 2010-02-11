require File.dirname(__FILE__) + '/../spec_helper'
 
describe AccountsController do
  integrate_views
  
  it "index action should render index template" do
    get :index
    response.should render_template(:index)
  end
  
  it "show action should render show template" do
    account = Factory.create(:account)
    get :show, :id => account.id
    response.should render_template(:show)
  end
  
  it "new action should render new template" do
    get :new
    response.should render_template(:new)
  end
  
  it "create action should render new template when model is invalid" do
    attributes = Factory.attributes_for(:invalid_account)
    post :create, :account => attributes
    response.should render_template(:new)
  end
  
  it "create action should redirect when model is valid" do
    attributes = Factory.attributes_for(:account)
    post :create, :account => attributes
    response.should redirect_to(account_url(assigns[:account]))
  end
  
  it "edit action should render edit template" do
    account = Factory.create(:account)
    get :edit, :id => account.id
    response.should render_template(:edit)
  end
  
  #it "update action should render edit template when model is invalid" do
  #  account = Factory.create(:account)
  #  put :update, :id => account.id
  #  response.should render_template(:edit)
  #end
  
  it "update action should redirect when model is valid" do
    account = Factory.create(:account)
    put :update, :id => account.id
    response.should redirect_to(account_url(assigns[:account]))
  end
  
  it "destroy action should destroy model and redirect to index action" do
    account = Factory.create(:account)
    delete :destroy, :id => account.id
    response.should redirect_to(accounts_url)
    Account.exists?(account.id).should be_false
  end
end
