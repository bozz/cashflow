class BankTransaction < ActiveRecord::Base

  belongs_to :bank_account

  validates :bank_account_id, :presence => true
  validates :date,            :presence => true
  validates :cents,           :presence => true

  validate :amount_must_be_nonzero

  scope :find_all_by_bank, lambda { |bank_id| where("bank_account_id = ?", bank_id) }
  scope :withIdAndBankAccount, lambda { |id, bank_id| where("id = ? AND bank_account_id = ?", id, bank_id) }

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


  def self.import_csv(csv_file, bank_account)
    require 'csv'

    import_counter = 0

    # csv_text = File.read(csv_file)
    csv = CSV.parse(csv_file, :headers => true, :col_sep => ';')
    csv.each do |row|
      row = row.to_hash.with_indifferent_access
      row[:bank_account_id] = bank_account.id
      BankTransaction.create!(row.to_hash.symbolize_keys)
      import_counter += 1
    end

    return import_counter
  end

end
