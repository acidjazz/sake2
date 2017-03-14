#!/bin/bash

s3cmd --config=/Users/k/.s3/.s3designsake sync public/ s3://designsake2.com --exclude '.DS_Store'
s3cmd setacl --config=/Users/k/.s3/.s3designsake s3://designsake2.com/ --acl-public --recursive
