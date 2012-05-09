class BankAccount < ActiveRecord::Base

  has_many :transactions

  validates :bank,           :presence => true
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


  def balance
    sum = initial_cents
    transactions.each do |t|
      sum += t.cents
    end
    Money.new(sum, currency)
  end

  def as_json(*args)
    hash = super(*args)
    hash['opening_balance'] = opening_balance.dollars
    return hash
  end
end
