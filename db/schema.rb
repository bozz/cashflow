# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120508104413) do

  create_table "accounts", :force => true do |t|
    t.string   "name"
    t.string   "identifier"
    t.text     "description"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "bank_accounts", :force => true do |t|
    t.string   "name"
    t.string   "bank",                              :null => false
    t.integer  "account_number",                    :null => false
    t.text     "description"
    t.datetime "created_at",                        :null => false
    t.datetime "updated_at",                        :null => false
    t.string   "currency",       :default => "EUR", :null => false
    t.integer  "initial_cents",  :default => 0,     :null => false
  end

  create_table "transactions", :force => true do |t|
    t.integer  "bank_account_id",                    :null => false
    t.date     "date",                               :null => false
    t.text     "description"
    t.text     "note"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.integer  "cents",           :default => 0,     :null => false
    t.string   "currency",        :default => "EUR", :null => false
  end

end
