class BasicReport < Report
  
  def get_data_as_json
    result = []
    account = accounts.each do |a|
      balance = a.calculate_balance("#{beginning_at}")
      transactions = a.transactions.find(:all, :conditions => "date > '#{beginning_at}' and date < '#{ending_at}'", :order => 'date')
      
      data = []
      data << [beginning_at, balance]
      data = data | transactions.map {|t| [t.date, t.amount]}
      
      result << {
        :balance => balance,
        :name => a.name,
        :data => data
      }
    end
    return result.to_json
  end
  
end
