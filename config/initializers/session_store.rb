# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_cashflow_session',
  :secret      => 'ab4a1363673c815d88a3245298702cb1efebf35381d47189aa605740dc8e61db996b8026f2a53c0122d1c65fc59d89eaaa849beb320e03abb18e1ba99702366e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
