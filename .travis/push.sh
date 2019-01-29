#!/bin/sh

setup_git() {
  
}

commit_website_files() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
 #git remote
  git remote -v
  git remote remove origin-build
# git remote add origin git@github.com:havasmtl-jkahner/botpress-channel-web.git
  git remote add origin-build "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git"
git remote -v
 git fetch
 git checkout -b master
 git pull origin master
# git checkout master
 #git config credential.helper store
 #git config --global user.email "jesse.kahner@havas.com"
 #git config --global user.name "havasmtl-jkahner"
  git add . *.js && git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
  git status
  git push --quiet --set-upstream origin-build master
  
}

upload_files() {
 
  #git push --set-upstream origin master
#   git push --quiet --set-upstream origin-build master
  #git push "https://${GH_TOKEN}@github.com/havasmtl-jkahner/botpress-channel-web.git" master > /dev/null 2>&1
#   git push
}

setup_git
commit_website_files
upload_files
