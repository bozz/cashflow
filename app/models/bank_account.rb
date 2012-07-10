class BankAccount < ActiveRecord::Base

  has_many :bank_transactions

  validates :bank,           :presence => true
  validates :name,           :presence => true
  validates :initial_cents,  :presence => true
  validates :account_number, :presence => true,
                             :numericality => true,
                             :length => { minimum: 5 }

  # use Money gem to handle amount (composed of cents and currency fields)
  composed_of :opening_balance,
    :class_name => "Money",
    :mapping => [%w(initial_cents cents), %w(currency currency_as_string)],
    :constructor => Proc.new { |cents, currency| Money.new(cents || 0, currency || Money.default_currency) },
    :converter => Proc.new { |value| value.respond_to?(:to_money) ? value.to_money : raise(ArgumentError, "Can't convert #{value.class} to Money") }


  # calculates and returns account balance. If no date is specified
  # then current date is assumed.
  def balance(date=nil)
    date ||= Time.now.strftime("%Y-%m-%d")
    validate_date(date)

    transaction_sum = BankTransaction.where("bank_account_id = ? AND date <= ?", id, date).sum('cents')
    sum = initial_cents + transaction_sum
    balance = get_formatted_balance(date, sum, currency)
  end

  # returns the balance in the given date range for each
  # day where there is at least one transaction - including an additional
  # starting balance on the 'from_date' if no transactions on that day, and 
  # also additional final balance if no transactions on that day.
  def balance_range(from_date, to_date)
    parsed_from_date = validate_date(from_date)
    parsed_to_date = validate_date(to_date)
    return [] if from_date > to_date

    balance = []
    transactions = BankTransaction.select("date(date) as date, currency, sum(cents) as cents").group("date(date)").having("bank_account_id = ? AND date >= ? AND date <= ?", id, from_date, to_date)
    sum = initial_cents
    transactions.each do |t|
      sum += t.cents
      balance << get_formatted_balance(t.date, sum, t.currency)
    end

    if balance.empty? || balance.first[:date] != parsed_from_date
      balance.unshift balance(from_date)
    end

    if balance.empty? || balance.last[:date] != parsed_to_date
      balance << balance(to_date)
    end

    balance
  end

  def get_formatted_balance(date, sum, currency)
    amount = Money.new(sum, currency)
    {
      date: date,
      amount: amount.dollars,
      cents:  amount.cents,
      currency: amount.currency.iso_code
    }
  end

  def as_json(*args)
    hash = super(*args)
    hash['opening_balance'] = opening_balance.dollars
    return hash
  end


  private

  # validates date format and also that date is not in the future.
  def validate_date(date)
    begin
      date = Date.parse(date)
      raise if date > Date.today
    rescue
      raise ApplicationController::InvalidDateError.new('invalid date')
    end
    date
  end
end
