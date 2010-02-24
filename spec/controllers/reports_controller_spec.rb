require File.dirname(__FILE__) + '/../spec_helper'
 
describe ReportsController do
  integrate_views
  
  it "index action should render index template" do
    get :index
    response.should render_template(:index)
  end
  
  it "show action should render show template" do
    report = Factory.create(:report)
    get :show, :id => report.id
    response.should render_template(:show)
  end
  
  it "new action should render new template" do
    get :new, :type => "BasicReport"
    response.should render_template(:new)
  end
  
  it "create action should render new template when model is invalid" do
    attributes = Factory.attributes_for(:invalid_report)
    post :create, :report => attributes
    #response.should render_template(:new)
    response.should redirect_to(new_report_url(:type => "BasicReport"))
  end
  
  it "create action should redirect when model is valid" do
    attributes = Factory.attributes_for(:report)
    post :create, :report => attributes
    response.should redirect_to(basic_report_url(assigns[:report]))
  end
  
  it "edit action should render edit template" do
    report = Factory.create(:report)
    get :edit, :id => report.id
    response.should render_template(:edit)
  end
  
  #it "update action should render edit template when model is invalid" do
  #  Report.any_instance.stubs(:valid?).returns(false)
  #  put :update, :id => Report.first
  #  response.should render_template(:edit)
  #end
  
  it "update action should redirect when model is valid" do
    report = Factory.create(:report)
    put :update, :id => report.id
    response.should redirect_to(basic_report_url(assigns[:report]))
  end
  
  it "destroy action should destroy model and redirect to index action" do
    report = Factory.create(:report)
    delete :destroy, :id => report.id
    response.should redirect_to(basic_reports_url)
    Report.exists?(report.id).should be_false
  end
end
