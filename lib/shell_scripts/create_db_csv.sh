#!/bin/bash

# Script for formatting DB (Deutsch Bank) CSV files.
# Expects an original DB CSV file as its argument.

set -e

if [ $# -lt 1 ]
then
  echo "Error: missing parameters:"
  echo "$0 source_file"
  exit
fi

function main {
  cat $1 |
  grep "^[0-9]" |
  ack -v "^[0-9]{2}.[0-9]{2}.[0-9]{4}.-.[0-9]{2}.[0-9]{2}.[0-9]{4}" |
  format_columns
}

function format_columns {
  awk '
    BEGIN {
      FS=";"
      print "date;purpose,amount,currency"
    }
    {
      # merge "haben" and "soll" into one field
      amount=$4
      if(amount=="") {
        amount=$5
      }
      gsub(/"/,"",$3)
      print $2 ";" $3 ";" amount ";" $6
    }
  '
}

main $1
