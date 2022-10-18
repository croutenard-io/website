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
export HUGO_DEV_PORT_NO=5654


hugo serve -b http://${HUGO_SERVER_IP}:${HUGO_DEV_PORT_NO} -p ${HUGO_DEV_PORT_NO} --bind ${HUGO_SERVER_IP} -w

```

<!-- 
* spinning up the hugo project :

```bash
export PATH=$PATH:/usr/local/go/bin && go version
export HUGO_DEV_PORT_NO=5654
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


hugo serve --baseURL http://${HUGO_SERVER_IP}:${HUGO_DEV_PORT_NO} --bind ${HUGO_SERVER_IP} --port ${HUGO_DEV_PORT_NO}

# Press Ctrl + C

# Set up example site :

cp -f themes/hargo/exampleSite/config.toml .

cp -fR themes/hargo/exampleSite/content/* ./content
cp -fR themes/hargo/exampleSite/data/* ./data
cp -fR themes/hargo/exampleSite/resources/* ./resources
cp -fR themes/hargo/exampleSite/static/* ./static

hugo serve --baseURL http://${HUGO_SERVER_IP}:${HUGO_DEV_PORT_NO} --bind ${HUGO_SERVER_IP} --port ${HUGO_DEV_PORT_NO}

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

## `Gulp` Build

* Visualize the current `Gulp` build environment : 

```bash
export IS_THIS_WINDOWS=true
gulp build:env
```

* Clean up the public and docs folders : 

```bash
export IS_THIS_WINDOWS=true
export HUGO_HTTP_SCHEMA=httpx
export HUGO_DEV_HOST="tabernacle-io.io"
export HUGO_DEV_PORT="7589"
gulp build:hugo:clean:prod
```

* Run the hugo build for dev, staging, or prod environment : 

```bash
export IS_THIS_WINDOWS=true

# --- Dev env 
export HUGO_HTTP_SCHEMA=http
export HUGO_DEV_HOST="127.0.0.1"
export HUGO_DEV_PORT="2314"
gulp build:hugo

# --- Staging env 
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard-io.surge.sh
export HUGO_PORT=443
gulp build:hugo

# --- Prod env 
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard.com
export HUGO_PORT=443
gulp build:hugo

```

* Prepare the github pages build (without any optimization like image processing, minification etc... ) :

```bash
# --- Prod env 
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard.com
export HUGO_PORT=443
gulp build:hugo:gh_pages

export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard.io
export HUGO_PORT=443
gulp build:hugo:gh_pages

# And now you get the whole build result inside the [docs/] folder
# Indeed, you can test it : 
export HUGO_HTTP_SCHEMA=http
export HUGO_HOST=127.0.0.1
export HUGO_PORT=3536

gulp build:hugo:gh_pages

serve -l tcp://${HUGO_HOST}:${HUGO_PORT} ./docs/
```

* After running the whole `hugo` build, and copying it all to the `docs/` folder, then you can run image processing (to optimize) : 

```bash
# And now you get the whole build result inside the [docs/] folder
# Indeed, you can test it : 
export HUGO_HTTP_SCHEMA=http
export HUGO_HOST=127.0.0.1
export HUGO_PORT=3536


# gulp build:hugo:gh_pages
# gulp build:img:resize
gulp build:hugo:prod:test

serve -l tcp://${HUGO_HOST}:${HUGO_PORT} ./docs/
```

* Image processing reference articles : 
  * https://www.freecodecamp.org/news/how-to-minify-images-with-gulp-gulp-imagemin-and-boost-your-sites-performance-6c226046e08e/
  * **best article i found on image optimization** : https://jec.fyi/blog/automating-image-optimization-workflow
  * seems like for image responsiveness, `srcset=` html atribute will do, and imagemagick to do the resizing : https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
  * this is why I chose to forget about using `imagemin` : https://github.com/imagemin/imagemin/issues/392

## Git config

* Configuration without GPG signatures:

```bash

# -----
# work on croutontech projects
export GPG_KEY_ID="1252B14BB9742A44"

git config user.name "croutontechlead"
git config user.email croutontechlead@gmail.com
git config user.signingkey ${GPG_KEY_ID}
git config commit.gpgsign false
# Now, to sign GIt commits, for example inside an SSH session (where TTY is a bit different ...)
export GPG_TTY=$(tty)

git config --list

export GIT_SSH_COMMAND='ssh -i ~/.ssh/.croutontechlead/id_rsa'
ssh -Ti ~/.ssh/.croutontechlead/id_rsa git@github.com


```


## Windows Installations

### Golang

```bash
# https://go.dev/dl/go1.19.2.windows-amd64.msi

choco install golang
```

