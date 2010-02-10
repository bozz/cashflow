require 'rake_utils.rb'

namespace :cf do
  
  namespace :import do
    
    desc "Import full data set from db/dumps/ into clean DB (requires Accounts, Transactions, Tags, Transactions_Tags)"
    task :dump, :needs => :environment do
      RakeUtils.import_dump("db/dumps/ ")
    end
    
    desc "Import specified CSV file of given type (db)"
    task :db, :filename, :needs => :environment do |t, args|
      RakeUtils.import_csv(args.filename, 'db')
    end
    
    
    desc "Import specified CSV file of given type (gls)"
    task :gls, :filename, :needs => :environment do |t, args|
      RakeUtils.import_csv(args.filename, 'gls')
    end
    
  end
  
  
  ############################
  
  task :test, :myvar, :needs => :environment do |t, args|
    args.with_defaults(:myvar => "ZZZ")
    
    puts "Ze var #{args.myvar}"
    RakeUtils.process_file("db/dumps/Accounts")
    
    #puts Account.all.inspect
  end
  
  
  
  #desc 'Create YAML test fixtures from data in an existing database. 
  #Defaults to development database. Set RAILS_ENV to override. Use args 
  #table and limit to dump one table and limit number of records'  
  task :extract_fixtures, :table, :limit, :needs => :environment do |t, args|  
    args.with_defaults(:table => nil, :limit => nil)  
    limit = args.limit.nil? ? "" : "LIMIT #{args.limit}"  
    sql = "SELECT * FROM %s #{limit}"  
    skip_tables = ["schema_info" ]  
    if args.table.nil?  
      tables = ActiveRecord::Base.connection.tables - skip_tables  
    else  
      tables = [ "#{args.table}"]  
    end  

    ActiveRecord::Base.establish_connection  
    tables.each do |table_name|  
      i = "000"  
      File.open("#{RAILS_ROOT}/test/fixtures/#{table_name}.yml" , 'w' ) do |file|  
        data = ActiveRecord::Base.connection.select_all(sql % table_name)  
        file.write data.inject({}) { |hash, record|  
          hash["#{table_name}_#{i.succ!}" ] = record  
          hash  
        }.to_yaml  
      end  
    end  
  end
  
end
