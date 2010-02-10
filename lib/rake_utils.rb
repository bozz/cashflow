require 'nokogiri'
include Nokogiri

module RakeUtils
  
  def RakeUtils.import_dump(dump_path)
    puts "Importing data from #{dump_path}"
    
    # check path to make sure it ends with forward slash
    dump_path = dump_path.strip
    if dump_path[-1,1] != "/"
       dump_path += "/"
    end
    
    # import accounts and get accounts mapping: accountId => accountName
    accounts_mapping = RakeUtils.import_accounts("#{dump_path}Accounts")
    #puts "Accounts: " + accounts_mapping.inspect
    
    # import tags and get tags mapping: tagId => tagName
    tags_mapping = RakeUtils.import_tags("#{dump_path}Tags")
    #puts "Tags: " + tags_mapping.inspect
    
    # get transaction_tags_mapping: in the form transactionId => array(tagName1, tagName2, ...)
   transaction_tags_mapping = RakeUtils.get_transaction_tags_mapping("#{dump_path}Transactions_Tags", tags_mapping)
   #puts "Transaction_Tags Mapping: " + transaction_tags_mapping.inspect
    
    # import transactions using above mappings
    RakeUtils.import_transactions("#{dump_path}Transactions", accounts_mapping, transaction_tags_mapping)
  end
  
  
  # imports accounts and returns accountId => accountName mapping
  def RakeUtils.import_accounts(table_name)
    counter = 0
    mapping = {}
    f = File.open(table_name, "r:utf-8")
    doc = Nokogiri::XML(f)
    doc.xpath('//row').each do |row|
      accountId = nil
      accountName = nil
      account = Account.new
      row.children.each do |child|
        unless child.text?
          if child.name=="id"
            accountId = child.content
          elsif child.name=="name"
            accountName = child.content
          end
          
          unless child.name=="id" || child.content=="<null>"
            account[child.name] = child.content
          end
          
        end
      end
      account.save
      mapping[accountId] = accountName
      counter += 1
    end
    f.close
    puts "#{counter}\t Accounts imported"
    return mapping
  end
  
  
  # imports accounts and returns tagId => tagName mapping
  def RakeUtils.import_tags(table_name)
    counter = 0
    mapping = {}
    f = File.open(table_name, "r:utf-8")
    doc = Nokogiri::XML(f)
    doc.xpath('//row').each do |row|
      tagId = nil
      tagName = nil
      tag = Tag.new
      row.children.each do |child|
        unless child.text?
          if child.name=="id"
            tagId = child.content
          elsif child.name=="name"
            tagName = child.content
          end
          unless child.name=="id" || child.content=="<null>"
            tag[child.name] = child.content
          end
        end
      end
      tag.save
      mapping[tagId] = tagName
      counter += 1
    end
    f.close
    puts "#{counter}\t Tags imported"
    return mapping
  end
  
  
  def RakeUtils.get_transaction_tags_mapping(table_name, tags_mapping)
    mapping = {}
    f = File.open(table_name, "r:utf-8")
    doc = Nokogiri::XML(f)
    doc.xpath('//row').each do |row|
      transId = nil
      tagId = nil
      row.children.each do |child|
        unless child.text?
          if child.name=="transaction_id"
            transId = child.content
          elsif child.name=="tag_id"
            tagId = child.content
          end
        end
      end
      unless mapping[transId]
        mapping[transId] = []
      end
      if tags_mapping[tagId]
        mapping[transId] << tags_mapping[tagId]
      end
    end
    f.close
    
    return mapping
  end
  
  
  def RakeUtils.import_transactions(table_name, accounts_mapping, transaction_tags_mapping)
    counter = 0;
    f = File.open(table_name, "r:utf-8")
    doc = Nokogiri::XML(f)
    doc.xpath('//row').each do |row|
      transaction = Transaction.new
      row.children.each do |c|
        unless c.text? || c.content=="<null>"
          if c.name=="id"
            transaction.tag_list = transaction_tags_mapping[c.content]
          elsif c.name=="account_id" 
            transaction.account = Account.find_by_name(accounts_mapping[c.content])
          else 
            transaction[c.name] = c.content
          end 
        end
      end
      transaction.save
      counter += 1
    end
    f.close
    puts "#{counter}\t Transactions imported"
  end
  
  
  def RakeUtils.import_csv(filename, type)
    if filename.nil?
      puts "Error: Missing filename!"
      puts "Usage: rake cf:import:db[filename]"
      exit
    end
  end
  
  
  def RakeUtils.process_file(table_name) 
    f = File.open(table_name, "r:utf-8")
    doc = Nokogiri::XML(f)
    doc.xpath('//row').each do |row|
      colNames = []
      colValues = []
      row.children.each do |c|
        unless c.text?
          colNames << c.name
          colValues << (c.content=="<null>" ? "" : c.content)
        end
      end
      puts "INSERT INTO #{table_name.downcase} (#{colNames.join(',')}) VALUES('#{colValues.join('\',\'')}'); "
    end
    f.close
  end
  
end