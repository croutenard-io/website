* we'll use hugo theme https://github.com/themefisher/hargo-hugo

* run locally :

```bash

export DESIRED_VERSION=0.0.0
export DESIRED_VERSION=master

cd ~/crouton.work
git clone git@github.com:croutenard-io/website.git ~/crouton.work

git checkout ${DESIRED_VERSION}


export PATH=$PATH:/usr/local/go/bin && go version
export HUGO_SERVER_IP=0.0.0.0
export HUGO_PORT_NO=5654


hugo serve -b http://${HUGO_SERVER_IP}:${HUGO_PORT_NO} -p ${HUGO_PORT_NO} --bind ${HUGO_SERVER_IP} -w

```


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






```bash

export DEPLOYMENT_DOMAIN=croutenard-io.surge.sh
export DEPLOYMENT_BASE_URL=https://${DEPLOYMENT_DOMAIN}

if [ -d ./docs ]; then
  rm -fr ./docs
fi;

if [ -d ./public ]; then
  rm -fr ./public
fi;

mkdir -p  ./docs
mkdir -p  ./public

surgeBuildNdeploy () {
  export PATH=$PATH:/usr/local/go/bin
  hugo -b ${DEPLOYMENT_BASE_URL}

  cp -fr ./public/* ./docs/
  surge ./public "${DEPLOYMENT_DOMAIN}"
}

surgeBuildNdeploy

```
