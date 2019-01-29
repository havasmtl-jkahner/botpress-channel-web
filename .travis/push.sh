#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI
}

commit_website_files() {
  git remote remove origin-build
  git remote add origin-build "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git"
  git remote -v
  git fetch
  git checkout -b master
  git pull origin master
  git add . *.js && git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git status
  git push --quiet --set-upstream origin-build master
}

upload_files() {
}

setup_git
commit_website_files
upload_files
