#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
 #git remote
 git checkout -b chose
 git config credential.helper store
 git config --global user.email "jesse.kahner@havas.com"
 git config --global user.name "havasmtl-jkahner"
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
git remote -v
  #git remote add origin "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git"
  #git push --set-upstream origin master
  #git push --quiet --set-upstream origin master
  #git push "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git" master > /dev/null 2>&1
  git push "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git" origin build-dev
}

#setup_git
commit_website_files
upload_files
