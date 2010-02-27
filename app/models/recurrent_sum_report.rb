class RecurrentSumReport < Report
  attr_accessible :chart_type, :recurrence, :tag_group_ids
  
  def get_data_as_json
    result = {
      :categories => [],
      :series => []
    }
      
    tag_groups.each do |tg|
      
      transactions = Transaction.tagged_with(tg.tag_list, 
        :conditions => "date > '#{beginning_at}' and date < '#{ending_at}'", 
        :order => 'date'
        #:match_all => :true
      )
      
      year_diff = ending_at.year - beginning_at.year
      months = ending_at.month + (year_diff*12) - beginning_at.month + 1
      
      buckets = Hash.new()
      
      categories = Array.new()
      month_counter = beginning_at.month
      year_counter = beginning_at.year
      months.times do 
        key = "#{month_counter}-#{year_counter}"
        buckets[key] = 0
        year_counter = month_counter<12 ? year_counter : year_counter+1
        categories << Date::ABBR_MONTHNAMES[month_counter]
       
        logger.info("mounth: #{month_counter} - #{Date::ABBR_MONTHNAMES[month_counter]}")
        month_counter = month_counter<12 ? month_counter+1 : 1 
      end
      
      transactions.each do |t|
        key = "#{t.date.month}-#{t.date.year}"
        buckets[key] += t.amount.to_f
      end
      
      result[:series] << {
        :name => tg.name,
        :tags => tg.tag_list,
        :data => buckets.values,
        #:data_full => transactions.map {|t| [t.date, t.amount]}
      }
      result[:categories] = categories
      
    end
      
    return result.to_json
  end
  
end
