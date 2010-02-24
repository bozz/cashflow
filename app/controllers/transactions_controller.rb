class TransactionsController < ApplicationController
  
  def index
    respond_to do |format|
      format.html 
      
      format.json do
        
        columnMapping = ["account_id", "date", "description", "amount", "note"]
        columnName = columnMapping[ params[:iSortCol_0].to_i ]
        
        page = params[:iDisplayStart].nil? ? 1 : (params[:iDisplayStart].to_i/params[:iDisplayLength].to_i)+1
        @transactions = Transaction.paginate :per_page => params[:iDisplayLength], :page => page, :order => "#{columnName} #{params[:sSortDir_0]}", :conditions => "description like '%#{params[:sSearch]}%'"
        render :json => {
          :sEcho => params[:sEcho],
          :iTotalRecords => Transaction.count,
          :iTotalDisplayRecords => @transactions.total_entries,
          :aaData =>  @transactions.map {|t| [t.account.name, t.date.strftime("%d.%m.%Y"), t.description, t.amount, t.note.to_s, t.id, t.id, t.id] }
        }
      end
    end
  end
  
  def show
    @transaction = Transaction.find(params[:id])
  end
  
  def new
    @transaction = Transaction.new
  end
  
  def create
    @transaction = Transaction.new(params[:transaction])
    if @transaction.save
      flash[:notice] = "Successfully created transaction."
      redirect_to @transaction
    else
      render :action => 'new'
    end
  end
  
  def edit
    @transaction = Transaction.find(params[:id])
  end
  
  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update_attributes(params[:transaction])
      flash[:notice] = "Successfully updated transaction."
      redirect_to @transaction
    else
      render :action => 'edit'
    end
  end
  
  def destroy
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
    flash[:notice] = "Successfully destroyed transaction."
    redirect_to transactions_url
  end
end
