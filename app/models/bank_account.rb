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


  # calculates and returns account balance. There are two modes for this
  # method, if only one parameter is provided, then the balance on the
  # specified date will be returned.
  # If a second parameter (from_date) is
  # specified then the balance in this range will be calculated for each
  # day where there is at least one transaction - including an additional
  # starting balance on the 'from_date' if no transactions on that day.
  def balance(date, from_date)
    date ||= Time.now.strftime("%Y-%m-%d")

    balance = []
    if from_date.nil?
      transaction_sum = BankTransaction.where("bank_account_id = ? AND date <= ?", id, date).sum('cents')
      sum = initial_cents + transaction_sum
      balance << get_formatted_balance(date, sum, currency)
    else
      transactions = BankTransaction.select("date(date) as date, currency, sum(cents) as cents").group("date(date)").having("bank_account_id = ? AND date >= ? AND date <= ?", id, from_date, date)
      sum = initial_cents
      transactions.each do |t|
        sum += t.cents
        balance << get_formatted_balance(t.date, sum, t.currency)
      end
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
end
