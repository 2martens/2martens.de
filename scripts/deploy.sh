#!/bin/bash
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/_site martens7@wolf.uberspace.de:tmp/$TRAVIS_BUILD_ID
ssh martens7@wolf.uberspace.de rm -rf tmp/old.build && mkdir tmp/old.build && mv html/* tmp/old.build/ && mv tmp/$TRAVIS_BUILD_ID/* html/