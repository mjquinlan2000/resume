#!/bin/bash

set -e

gsutil cp ./index.html gs://www.mikequinlan.rocks
gsutil cp ./images/favicon.ico gs://www.mikequinlan.rocks/images
gsutil cp ./styles/application.css gs://www.mikequinlan.rocks/styles
gsutil acl ch -u AllUsers:R \
  'gs://www.mikequinlan.rocks/*.html' \
  'gs://www.mikequinlan.rocks/images/*' \
  'gs://www.mikequinlan.rocks/styles/*'

gsutil web set -m index.html gs://www.mikequinlan.rocks
