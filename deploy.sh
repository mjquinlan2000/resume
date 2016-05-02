#!/bin/bash

set -e

gulp clean
gulp build
gsutil rsync -R ./dist gs://www.mikequinlan.rocks
gsutil acl ch -u AllUsers:R \
  'gs://www.mikequinlan.rocks/*.html' \
  'gs://www.mikequinlan.rocks/images/*' \
  'gs://www.mikequinlan.rocks/styles/*'

gsutil web set -m index.html gs://www.mikequinlan.rocks
