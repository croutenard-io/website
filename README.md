# Croutenard.com

* We used hugo theme https://github.com/themefisher/hargo-hugo

## Run locally 

```bash

export DESIRED_VERSION=0.0.0
export DESIRED_VERSION=master

cd ~/crouton.work
git clone git@github.com:croutenard-io/website.git ~/crouton.work

git checkout ${DESIRED_VERSION}


export PATH=$PATH:/usr/local/go/bin && go version
export HUGO_SERVER_IP=127.0.0.1
export HUGO_PORT_NO=5654


hugo serve -b http://${HUGO_SERVER_IP}:${HUGO_PORT_NO} -p ${HUGO_PORT_NO} --bind ${HUGO_SERVER_IP} -w

```

<!-- 
* spinning up the hugo project :

```bash
export PATH=$PATH:/usr/local/go/bin && go version
export HUGO_PORT_NO=5654
export HUGO_SERVER_IP=0.0.0.0
export HUGO_THEME_SSH_URI="git@github.com:themefisher/hargo-hugo"
export HUGO_THEME_VERSION="master"
export HUGO_THEME_VERSION="ae67348579fdd36395711b1e726bc67c48bc9169"

hugo new site croute
cp -fR ./croute/* .
rm -fr ./croute/

git clone ${HUGO_THEME_SSH_URI} ./themes/hargo

cd ./themes/hargo

git checkout ${HUGO_THEME_VERSION}
rm -fr ./.git/

cd ../..


# then edit the config.toml
cat <<EOF> ./config.toml
baseURL = 'http://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
themesDir = "./themes/"
theme = "hargo"
EOF


hugo serve --baseURL http://${HUGO_SERVER_IP}:${HUGO_PORT_NO} --bind ${HUGO_SERVER_IP} --port ${HUGO_PORT_NO}

# Press Ctrl + C

# Set up example site :

cp -f themes/hargo/exampleSite/config.toml .

cp -fR themes/hargo/exampleSite/content/* ./content
cp -fR themes/hargo/exampleSite/data/* ./data
cp -fR themes/hargo/exampleSite/resources/* ./resources
cp -fR themes/hargo/exampleSite/static/* ./static

hugo serve --baseURL http://${HUGO_SERVER_IP}:${HUGO_PORT_NO} --bind ${HUGO_SERVER_IP} --port ${HUGO_PORT_NO}

# Press Ctrl + C

```


-->

## Deploy your PR to https://surge.sh 


```bash
# npm i
npm run pr
```


## Release to https://croutenard.com


```bash

# finish all the git flow features/fixes : merges all onto the 'develop' git branch

# onto the 'develop' git branch : run the hugo build, the build asset will be in the [public/] folder

# onto the 'develop' git branch : copy the [public/] folder, to the github pages configured folder, [docs/]

export DEPLOYMENT_DOMAIN="croutenard.com"
export DEPLOYMENT_BASE_URL="https://${DEPLOYMENT_DOMAIN}"

hugoClean () {
    if [ -d ./docs ]; then
    rm -fr ./docs
    fi;

    if [ -d ./public ]; then
    rm -fr ./public
    fi;

    mkdir -p  ./docs
    mkdir -p  ./public
}

cleanRubbishContentPublic () {

  rm -fr ./public/images/material/
  rm -fr ./public/images/products/
  rm -fr ./public/images/clients/
  rm -f ./public/images/blog/post-1.jpg
  # rm -f ./public/images/blog/post-2.jpg
  rm -f ./public/images/blog/post-3.jpg
  rm -f ./public/images/blog/post-4.jpg
  
}

hugoProdBuild () {
  export PATH=$PATH:/usr/local/go/bin
  hugo -b ${DEPLOYMENT_BASE_URL}
}

copyToDist () {
  cp -fr ./public/* ./docs/
}

hugoClean
hugoProdBuild
cleanRubbishContentPublic
# here i should run image processing tasks
# finally I copy all from ./public/ to ./docs/
copyToDist

export CROUTENARD_RELEASE_NUM="0.0.5"
# make a git-flow release
git flow release start "${CROUTENARD_RELEASE_NUM}"
git push -u origin --all
# ---
# [finish -s] Signed release
# git flow release finish -s "${CROUTENARD_RELEASE_NUM}"
git flow release finish "${CROUTENARD_RELEASE_NUM}"
git push -u origin --all

```

## Gulp

* Visualize the current Gulp build environment : 

```bash
gulp build:env
```
