#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
 #git remote
 git config user.email "jesse.kahner@havas.com"
 git config user.name "havasmtl-jkahner"
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git > /dev/null 2>&1
  git push --quiet --set-upstream origin build-dev
  #git push "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git" master > /dev/null 2>&1
}

#setup_git
commit_website_files
upload_files
