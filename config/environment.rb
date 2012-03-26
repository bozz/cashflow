# Load the rails application
require File.expand_path('../application', __FILE__)

# set default currency
Money.default_currency = Money::Currency.new("EUR")

# Initialize the rails application
Cashflow::Application.initialize!
