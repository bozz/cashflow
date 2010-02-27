class TagGroupsController < ApplicationController
  before_filter :only => [:create, :update] { |c| c.send(:get_tag_list, c.params[:tag_group]) }
  
  def index
    @tag_groups = TagGroup.all
  end
  
  def show
    @tag_group = TagGroup.find(params[:id])
  end
  
  def new
    @tag_group = TagGroup.new
  end
  
  def create
    @tag_group = TagGroup.new(params[:tag_group])
    if @tag_group.save
      flash[:notice] = "Successfully created tag group."
      redirect_to @tag_group
    else
      render :action => 'new'
    end
  end
  
  def edit
    @tag_group = TagGroup.find(params[:id])
  end
  
  def update
    @tag_group = TagGroup.find(params[:id])
    if @tag_group.update_attributes(params[:tag_group])
      flash[:notice] = "Successfully updated tag group."
      redirect_to @tag_group
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @tag_group = TagGroup.find(params[:id])
    @tag_group.destroy
    flash[:notice] = "Successfully destroyed tag group."
    redirect_to tag_groups_url
  end
  
end
