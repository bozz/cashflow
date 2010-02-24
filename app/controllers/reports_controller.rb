class ReportsController < ApplicationController
  
  def index
    @reports = Report.all
  end
  
  def show
    @report = Report.find(params[:id])
  end
  
  def new
    @report = Object.const_get(params[:type]).new
  end
  
  def create
    if params[:report]  && params[:report][:type]
      @report = Object.const_get(params[:report][:type]).new(params[:report])
    end
    
    if @report && @report.save
      flash[:notice] = "Successfully created report."
      redirect_to @report
    else
      redirect_to new_report_url(:type => "BasicReport")
    end
  end
  
  def edit
    @report = Report.find(params[:id])
  end
  
  def update
    @report = Report.find(params[:id])
    if @report.update_attributes(params[:report])
      flash[:notice] = "Successfully updated report."
      redirect_to @report
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @report = Report.find(params[:id])
    @report.destroy
    flash[:notice] = "Successfully destroyed report."
    redirect_to basic_reports_url
  end
end
