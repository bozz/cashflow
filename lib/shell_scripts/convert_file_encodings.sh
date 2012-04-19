#!/bin/bash

# shell script for converting all files in specified source directory
# to specified encoding. Note: This will overwrite files with new encoding.

set -e

if [ $# -lt 1 ]
then
  echo "Error: missing parameters:"
  echo "$0 source_dir target_encoding(=utf-8)"
  exit
elif [ $# -lt 2 ]
then
  targetEncoding="utf-8"
else
  targetEncoding=$2
fi

function getCurrentEncoding {
  encoding=$(file $1 | cut -d ' ' -f 2)
  if [ "$encoding" = "ISO-8859" ]; then
    encoding="windows-1252"
  fi
}

for f in $1/*
do
  if test -f $f
  then
    getCurrentEncoding $f
    echo -e "Converting $f" $encoding
    iconv -f $encoding -t $targetEncoding $f > $f.new
    mv $f.new $f
  fi
done
