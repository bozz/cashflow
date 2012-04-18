class Transaction < ActiveRecord::Base
  belongs_to :bank_account

  validates :bank_account_id, :presence => true
  validates :date,            :presence => true
  validates :cents,           :presence => true

  validate :amount_must_be_nonzero

  # use Money gem to handle amount (composed of cents and currency fields)
  composed_of :amount,
    :class_name => "Money",
    :mapping => [%w(cents cents), %w(currency currency_as_string)],
    :constructor => Proc.new { |cents, currency| Money.new(cents || 0, currency || Money.default_currency) },
    :converter => Proc.new { |value| value.respond_to?(:to_money) ? value.to_money : raise(ArgumentError, "Can't convert #{value.class} to Money") }

  def amount_must_be_nonzero
    errors.add(:amount, "must be nonzero") if amount.cents.zero?
  end

  def as_json(*args)
    hash = super(*args)
    hash['amount'] = amount.dollars
    return hash
  end

end
