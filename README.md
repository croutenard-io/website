# Croutenard.com

* We used hugo theme https://github.com/themefisher/hargo-hugo

## Current work (WIP)

* To test the image processing for responsivenss of images :

```bash 
export HUGO_HTTP_SCHEMA=http
export HUGO_HOST="127.0.0.1"
export HUGO_PORT="2314"

gulp watch:img:prod

```

* The issue I meet for the moment : 
  * The work is auto recursive without stop condition
  * Indeed : 

```bash
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xl.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-lg.jpeg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-lg.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-lg.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-md.jpeg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-md.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-md.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-sm.jpeg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-sm.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-sm.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xl.jpeg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xl.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xl.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xs.jpeg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xs.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs-x-reponsiveness-xs.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs.avif
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs.jpg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB-x-reponsiveness-xs.webp
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB.jpg
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB.png
 create mode 100644 docs/images/crouton/logo/CROUTENARD_SIMPLE_RVB.svg
 create mode 100644 docs/images/crouton/logo/johanna2/CROUTENARD_RVB.svg
 create mode 100644 docs/images/crouton/logo/johanna2/CROUTENARD_SIMPLE_RVB.svg
 rewrite docs/images/cta-overlay.png (100%)
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-lg.jpeg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-lg.png
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-lg.webp
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-md.jpeg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-md.png
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-md.webp
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-sm.jpeg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-sm.png
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-sm.webp
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xl.jpeg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xl.png
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xl.webp
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xs.jpeg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xs.png
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg-x-reponsiveness-xs.webp
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg.avif
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg.jpg
 create mode 100644 docs/images/video-thumb-x-reponsiveness-lg.webp

```




## Run locally 


```bash

# --- + --- #
# For versions greater or equal to ['0.0.5']
export DESIRED_VERSION=0.0.5
export DESIRED_VERSION=master

cd ~/crouton.work
git clone git@github.com:croutenard-io/website.git ~/crouton.work

git checkout ${DESIRED_VERSION}

export HUGO_HTTP_SCHEMA=http
export HUGO_HOST=127.0.0.1
export HUGO_PORT=5654
export POKUS_IMG_LIST=./my.pokus.image.list
export POKUS_DEPLOYMENT_DIR=./docs/

gulp build:deployment

serve -l tcp://${HUGO_HOST}:${HUGO_PORT} ./docs/
```


<!-- 
* Or you can build just the hugo build alone :
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
 -->
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

* You may now also deploy to surge with : 

```bash
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard-io.surge.sh
export HUGO_PORT=443
export POKUS_IMG_LIST=./my.pokus.image.list
export POKUS_DEPLOYMENT_DIR=./docs/

gulp build:deployment

surge ${POKUS_DEPLOYMENT_DIR} ${HUGO_HOST}

```

<!--
* Old way to deploy to surge : 
```bash
# npm i
npm run pr
```
 -->


## Release to https://croutenard.com



```bash

# finish all the git flow features/fixes : merges all onto the 'develop' git branch

# onto the 'develop' git branch : run the hugo build, the build asset will be in the [public/] folder

# onto the 'develop' git branch : copy the [public/] folder, to the github pages configured folder, [docs/]

export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard.com
export HUGO_PORT=443
export POKUS_IMG_LIST=./my.pokus.image.list
export POKUS_DEPLOYMENT_DIR=./docs/

gulp build:deployment

export CROUTENARD_RELEASE_NUM="0.0.5"
export GIT_SSH_COMMAND='ssh -i ~/.ssh.crouton/id_rsa'

${GIT_SSH_COMMAND} -T git@github.com

git add -A && git commit -m "prepare release ${CROUTENARD_RELEASE_NUM}" && git push -u origin HEAD
# make a git-flow release
git flow release start "${CROUTENARD_RELEASE_NUM}"
git push -u origin --all
# ---
# [finish -s] Signed release
# git flow release finish -s "${CROUTENARD_RELEASE_NUM}"
git flow release finish "${CROUTENARD_RELEASE_NUM}"

git push -u origin --all && git push -u origin --tags

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
export HUGO_HOST="tabernacle-io.io"
export HUGO_PORT="7589"
gulp build:hugo:clean:prod
```

* Run the hugo build for dev, staging, or prod environment : 

```bash
export IS_THIS_WINDOWS=true

# --- Dev env 
export HUGO_HTTP_SCHEMA=http
export HUGO_HOST="127.0.0.1"
export HUGO_PORT="2314"
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


* Image processing reference articles : 
  * https://www.freecodecamp.org/news/how-to-minify-images-with-gulp-gulp-imagemin-and-boost-your-sites-performance-6c226046e08e/
  * **best article i found on image optimization** : https://jec.fyi/blog/automating-image-optimization-workflow
  * seems like for image responsiveness, `srcset=` html atribute will do, and imagemagick to do the resizing : https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
  * this is why I chose to forget about using `imagemin` : https://github.com/imagemin/imagemin/issues/392



## About image processing 


* Install imagemagick : 
  * On windows with `chocolatey` : 

```bash

choco install imagemagick.app

# --- --- --- --- --- --- ---
# --- --- --- --- --- --- ---
# --- --- --- --- --- --- ---
# export PATH="\$PATH:/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/"
# echo 'export PATH="$PATH:/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/"' | tee -a ~/.profile
# echo 'export PATH="$PATH:/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/"' | tee -a ~/.bash_profile
# echo 'export PATH="$PATH:/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/"' | tee -a ~/.bashrc
mkdir -p ~/.pokus.intallations/imagemagick/
cp -fr /C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/* ~/.pokus.intallations/imagemagick/





echo 'export PATH="$PATH:~/.pokus.intallations/imagemagick/"' | tee -a ~/.profile
echo 'export PATH="$PATH:~/.pokus.intallations/imagemagick/"' | tee -a ~/.bash_profile
echo 'export PATH="$PATH:~/.pokus.intallations/imagemagick/"' | tee -a ~/.bashrc

source ~/.bashrc

magick --version
ffmpeg -version

magick convert --help
magick mogrify --help
# ---------------------- ---------------------- 
# mogrify: unable to open image '--help': No such file or directory @ # error/blob.c/OpenBlob/3570.
# mogrify: no decode delegate for this image format `' @ error/constitute.c/ReadImage/741.
# ---------------------- ---------------------- 
# 
# $ which magick
# /c/Users/Utilisateur/.pokus.intallations/imagemagick/magick
# 
# $ which ffmpeg
# /c/Users/Utilisateur/.pokus.intallations/imagemagick/ffmpeg
# 
# ---------------------- ---------------------- 

# --- Now let's try a a few tests : 

export POKUS_INPUT_PATH=static/images
export POKUS_OUTPUT_PATH=static/.magick/images/
export POKUS_OUTPUT_WIDTH=200

export POKUS_INPUT_PATH=./static/images/crouton/delivery/1.png
export POKUS_OUTPUT_PATH=./static/.magick/.test1/images/crouton/delivery/1.png
export POKUS_OUTPUT_WIDTH=200

export POKUS_INPUT_PATH=./static/images/crouton/delivery/1.png
export POKUS_OUTPUT_PATH=./static/.magick/.test2/images/crouton/delivery/1.png
export POKUS_OUTPUT_WIDTH=400

export POKUS_INPUT_PATH=./static/images/crouton/delivery/1.png
export POKUS_OUTPUT_PATH=./static/.magick/.test3/images/crouton/delivery/1.png
export POKUS_OUTPUT_WIDTH=600

export POKUS_INPUT_PATH=./static/images/crouton/delivery/1.png
export POKUS_OUTPUT_PATH=./static/.magick/.test4/images/crouton/delivery/
export POKUS_OUTPUT_WIDTH=600


export POKUS_INPUT_PATH=./static/images/crouton/delivery/*.png
export POKUS_OUTPUT_PATH=./static/.magick/.test5/images/crouton/delivery/
export POKUS_OUTPUT_WIDTH=600

mkdir -p ${POKUS_OUTPUT_PATH}
magick mogrify -path ${POKUS_OUTPUT_PATH} -filter Triangle -define filter:support=2 -thumbnail ${POKUS_OUTPUT_WIDTH} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${POKUS_INPUT_PATH}

# Ok so this works : now i can start gulping all this

# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- Optimize all images in [./docs/images/crouton/delivery/] and
# --- locally serve
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #

export HUGO_HTTP_SCHEMA=http
export HUGO_HOST=127.0.0.1
export HUGO_PORT=3536

gulp build:hugo:gh_pages

# --- Now I run image magick against the image files in the 'docs/' 
#     folder for github pages deployment
export POKUS_INPUT_PATH=./docs/images/crouton/delivery/*.png
export POKUS_OUTPUT_PATH=./docs/images.optimized/crouton/delivery/
export POKUS_OUTPUT_WIDTH=600

mkdir -p ${POKUS_OUTPUT_PATH}
magick mogrify -path ${POKUS_OUTPUT_PATH} -filter Triangle -define filter:support=2 -thumbnail ${POKUS_OUTPUT_WIDTH} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${POKUS_INPUT_PATH}
rm -fr ./docs/images/crouton/delivery/ && mkdir -p ./docs/images/crouton/delivery/
cp -fr ./docs/images.optimized/crouton/delivery/* ./docs/images/crouton/delivery/
rm -fr ./docs/images.optimized/



serve -l tcp://${HUGO_HOST}:${HUGO_PORT} ./docs/


# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- Deploy To Surge
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard-io.surge.sh
export HUGO_PORT=443

gulp build:hugo:gh_pages

# --- Now I run image magick against the image files in the 'docs/' 
#     folder for github pages deployment
export POKUS_INPUT_PATH=./docs/images/crouton/delivery/*.png
export POKUS_OUTPUT_PATH=./docs/images.optimized/crouton/delivery/
export POKUS_OUTPUT_WIDTH=900

mkdir -p ${POKUS_OUTPUT_PATH}
magick mogrify -path ${POKUS_OUTPUT_PATH} -filter Triangle -define filter:support=2 -thumbnail ${POKUS_OUTPUT_WIDTH} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${POKUS_INPUT_PATH}
rm -fr ./docs/images/crouton/delivery/ && mkdir -p ./docs/images/crouton/delivery/
cp -fr ./docs/images.optimized/crouton/delivery/* ./docs/images/crouton/delivery/
rm -fr ./docs/images.optimized/

surge ./docs/ ${HUGO_HOST}





# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- Recursively Optimize all images and locally serve
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
export HUGO_HTTP_SCHEMA=http
export HUGO_HOST=127.0.0.1
export HUGO_PORT=3536

gulp build:hugo:gh_pages


export POKUS_IMG_LIST=./my.pokus.image.list

# tree -f ./docs/ | grep -E '^*\.ico|^*\.png|^*\.jpg|^*\.jpeg|^*\.gif|^*\.svg' | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}
tree -f ./docs/ | grep -E '^*\.png|^*\.jpg|^*\.jpeg' | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}

# --- Now for each image file path, i run the optimization using Image Magick mogrify
while read IMG_FILE_PATH; do
  
  export POKUS_INPUT_PATH=${IMG_FILE_PATH}
  export TRAIL_IMG_FILENAME=$(echo ${POKUS_INPUT_PATH} | awk -F '/' '{print $NF}')
  export POKUS_OUTPUT_PATH=$(echo ${POKUS_INPUT_PATH} | sed "s#/${TRAIL_IMG_FILENAME}##g")

  # export POKUS_OUTPUT_PATH=./docs/images.optimized/crouton/delivery/
  export POKUS_OUTPUT_WIDTH=600
  echo " >> IMG_FIL_PATH=[${IMG_FILE_PATH}] "
  echo " >> POKUS_INPUT_PATH=[${POKUS_INPUT_PATH}] "
  echo " >> TRAIL_IMG_FILENAME=[${TRAIL_IMG_FILENAME}] "
  echo " >> POKUS_OUTPUT_PATH=[${POKUS_OUTPUT_PATH}] "
  echo " >> POKUS_OUTPUT_WIDTH=[${POKUS_OUTPUT_WIDTH}] "
  mkdir -p ${POKUS_OUTPUT_PATH}
  magick mogrify -path ${POKUS_OUTPUT_PATH} -filter Triangle -define filter:support=2 -thumbnail ${POKUS_OUTPUT_WIDTH} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${POKUS_INPUT_PATH}
done <${POKUS_IMG_LIST}



serve -l tcp://${HUGO_HOST}:${HUGO_PORT} ./docs/


# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- Recursively Optimize all images and deploy to surge
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard-io.surge.sh
export HUGO_PORT=443

gulp build:hugo:gh_pages


export POKUS_IMG_LIST=./my.pokus.image.list

# tree -f ./docs/ | grep -E '^*\.ico|^*\.png|^*\.jpg|^*\.jpeg|^*\.gif|^*\.svg' | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}
tree -f ./docs/ | grep -E '^*\.png|^*\.jpg|^*\.jpeg' | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}

# --- Now for each image file path, i run the optimization using Image Magick mogrify
while read IMG_FILE_PATH; do
  
  export POKUS_INPUT_PATH=${IMG_FILE_PATH}
  export TRAIL_IMG_FILENAME=$(echo ${POKUS_INPUT_PATH} | awk -F '/' '{print $NF}')
  export POKUS_OUTPUT_PATH=$(echo ${POKUS_INPUT_PATH} | sed "s#/${TRAIL_IMG_FILENAME}##g")

  # export POKUS_OUTPUT_PATH=./docs/images.optimized/crouton/delivery/
  export POKUS_OUTPUT_WIDTH=600
  echo " >> IMG_FIL_PATH=[${IMG_FILE_PATH}] "
  echo " >> POKUS_INPUT_PATH=[${POKUS_INPUT_PATH}] "
  echo " >> TRAIL_IMG_FILENAME=[${TRAIL_IMG_FILENAME}] "
  echo " >> POKUS_OUTPUT_PATH=[${POKUS_OUTPUT_PATH}] "
  echo " >> POKUS_OUTPUT_WIDTH=[${POKUS_OUTPUT_WIDTH}] "
  mkdir -p ${POKUS_OUTPUT_PATH}
  magick mogrify -path ${POKUS_OUTPUT_PATH} -filter Triangle -define filter:support=2 -thumbnail ${POKUS_OUTPUT_WIDTH} -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip ${POKUS_INPUT_PATH}
done <${POKUS_IMG_LIST}


surge ./docs/ ${HUGO_HOST}


### And now with gulp only I can run :
export HUGO_HTTP_SCHEMA=https
export HUGO_HOST=croutenard-io.surge.sh
export HUGO_PORT=443
export POKUS_IMG_LIST=./my.pokus.image.list
export POKUS_DEPLOYMENT_DIR=./docs/

gulp build:deployment

surge ${POKUS_DEPLOYMENT_DIR} ${HUGO_HOST}

```
* it seems that i have got a performance issue with the https://rating-widget.com service to package my webapp for production.
* i need to setup automated `stiespeed.io` tests and publish daily reports for that, along with `k6` performance tests during business downtimes like during night time. I saw that for `sitespeed.io`, you can set up grafana and grafite together, to get nice curves over time (would be interesting to follow up perfoance evolution with releases / deployments over time).
* Ok now i have a look at sitespeed.io tests results, obviously I jhave 2 other improvements axes : 
  * google apis is very badly impacting for third party service that i don't really care about for now
  * all the static assets downloaded from `surge.sh` imapct a lot, and it seems there's a real part (`3.7 MB`) that is made of JavaScript :
    *  I could verify that the total volume of javascript downloaded from surge is only between `400 KB` and `500 KB`
    * So all third party javascript is a lot, like `3 MB` : 
      * google apis : i will get rid of that
      * snipcart : that, i do not really have a choice, we do need the credit card payments feature.
* So here is what i can do : 
  * I can minify all the css into one file : i will have to change the hugo layout to pick the single bundle
  * I can minify all js files into one big large bundle file : same i ll have to change HTML a bit hugo layout template for `layouts/partials/head.html`
* And I get : 

```bash
Installing 64-bit imagemagick.app...
imagemagick.app has been installed.
  imagemagick.app can be automatically uninstalled.
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The install of imagemagick.app was successful.
  Software installed to 'C:\Program Files\ImageMagick-7.1.0-Q16-HDRI\'


```

* Okay, now here are the executables that i have got : 
  * `dcraw.exe`
  * `ffmpeg.exe`
  * `hp2xx.exe`
  * `imdisplay.exe`
  * `magick.exe`
  * `unins000.exe`


```bash

/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/ffmpeg.exe -version
/C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/magick.exe --version

```

```bash

$ ls -alh /C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/*.exe # --version
-rwxr-xr-x 1 Utilisateur 197121 328K Oct 16 17:02 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/dcraw.exe'*
-rwxr-xr-x 1 Utilisateur 197121  63M Oct 16 17:02 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/ffmpeg.exe'*
-rwxr-xr-x 1 Utilisateur 197121 236K Oct 16 17:02 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/hp2xx.exe'*
-rwxr-xr-x 1 Utilisateur 197121 169K Oct 16 17:02 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/imdisplay.exe'*
-rwxr-xr-x 1 Utilisateur 197121  48K Oct 16 17:03 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/magick.exe'*
-rwxr-xr-x 1 Utilisateur 197121 3.1M Oct 21 16:14 '/C/Program Files/ImageMagick-7.1.0-Q16-HDRI/unins000.exe'*

build:hugo:clean:gh_pages
$ ls -alh /C/Program\ Files/ImageMagick-7.1.0-Q16-HDRI/ # --version
total 101M
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 ./
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 ../
-rwxr-xr-x 1 Utilisateur 197121 497K Oct 16 17:02 CORE_RL_Magick++_.dll*
-rwxr-xr-x 1 Utilisateur 197121 2.0M Oct 16 17:02 CORE_RL_MagickCore_.dll*
-rwxr-xr-x 1 Utilisateur 197121 1.3M Oct 16 17:02 CORE_RL_MagickWand_.dll*
-rwxr-xr-x 1 Utilisateur 197121  86K Oct 16 17:02 CORE_RL_bzlib_.dll*
-rwxr-xr-x 1 Utilisateur 197121 1.2M Oct 16 17:02 CORE_RL_cairo_.dll*
-rwxr-xr-x 1 Utilisateur 197121 3.8M Oct 16 17:02 CORE_RL_exr_.dll*
-rwxr-xr-x 1 Utilisateur 197121 1.1M Oct 16 17:02 CORE_RL_flif_.dll*
-rwxr-xr-x 1 Utilisateur 197121 662K Oct 16 17:02 CORE_RL_freetype_.dll*
-rwxr-xr-x 1 Utilisateur 197121 123K Oct 16 17:02 CORE_RL_fribidi_.dll*
-rwxr-xr-x 1 Utilisateur 197121 2.6M Oct 16 17:02 CORE_RL_glib_.dll*
-rwxr-xr-x 1 Utilisateur 197121 968K Oct 16 17:02 CORE_RL_harfbuzz_.dll*
-rwxr-xr-x 1 Utilisateur 197121 4.0M Oct 16 17:02 CORE_RL_heif_.dll*
-rwxr-xr-x 1 Utilisateur 197121 240K Oct 16 17:02 CORE_RL_jp2_.dll*
-rwxr-xr-x 1 Utilisateur 197121 629K Oct 16 17:02 CORE_RL_jpeg-turbo_.dll*
-rwxr-xr-x 1 Utilisateur 197121 3.7M Oct 16 17:02 CORE_RL_jpeg-xl_.dll*
-rwxr-xr-x 1 Utilisateur 197121 359K Oct 16 17:02 CORE_RL_lcms_.dll*
-rwxr-xr-x 1 Utilisateur 197121  71K Oct 16 17:02 CORE_RL_lqr_.dll*
-rwxr-xr-x 1 Utilisateur 197121 165K Oct 16 17:02 CORE_RL_lzma_.dll*
-rwxr-xr-x 1 Utilisateur 197121 375K Oct 16 17:02 CORE_RL_openjpeg_.dll*
-rwxr-xr-x 1 Utilisateur 197121 356K Oct 16 17:02 CORE_RL_pango_.dll*
-rwxr-xr-x 1 Utilisateur 197121 206K Oct 16 17:02 CORE_RL_png_.dll*
-rwxr-xr-x 1 Utilisateur 197121 1.1M Oct 16 17:02 CORE_RL_raw_.dll*
-rwxr-xr-x 1 Utilisateur 197121 536K Oct 16 17:02 CORE_RL_rsvg_.dll*
-rwxr-xr-x 1 Utilisateur 197121 432K Oct 16 17:02 CORE_RL_tiff_.dll*
-rwxr-xr-x 1 Utilisateur 197121 534K Oct 16 17:02 CORE_RL_webp_.dll*
-rwxr-xr-x 1 Utilisateur 197121 459K Oct 16 17:02 CORE_RL_xml_.dll*
-rwxr-xr-x 1 Utilisateur 197121 113K Oct 16 17:02 CORE_RL_zip_.dll*
-rwxr-xr-x 1 Utilisateur 197121  94K Oct 16 17:02 CORE_RL_zlib_.dll*
-rw-r--r-- 1 Utilisateur 197121 247K Oct 16 16:30 ChangeLog.md
-rw-r--r-- 1 Utilisateur 197121  22K Oct 16 16:30 ImageMagick.ico
-rw-r--r-- 1 Utilisateur 197121 7.4K Oct 16 16:30 ImageMagick.rdf
-rw-r--r-- 1 Utilisateur 197121  13K Oct 16 16:30 License.txt
-rw-r--r-- 1 Utilisateur 197121 353K Oct 16 16:35 NOTICE.txt
-rw-r--r-- 1 Utilisateur 197121 4.6K Oct 16 16:30 QuickStart.txt
-rw-r--r-- 1 Utilisateur 197121 7.4K Oct 16 16:30 README.txt
-rw-r--r-- 1 Utilisateur 197121  922 Oct 16 16:30 coder.xml
-rw-r--r-- 1 Utilisateur 197121 1.4K Oct 16 16:30 colors.xml
-rw-r--r-- 1 Utilisateur 197121 1.1K Oct 16 16:35 configure.xml
-rwxr-xr-x 1 Utilisateur 197121 328K Oct 16 17:02 dcraw.exe*
-rw-r--r-- 1 Utilisateur 197121 9.9K Oct 16 16:30 delegates.xml
-rw-r--r-- 1 Utilisateur 197121  53K Oct 16 16:30 english.xml
-rwxr-xr-x 1 Utilisateur 197121  63M Oct 16 17:02 ffmpeg.exe*
-rwxr-xr-x 1 Utilisateur 197121 236K Oct 16 17:02 hp2xx.exe*
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 images/
-rwxr-xr-x 1 Utilisateur 197121 169K Oct 16 17:02 imdisplay.exe*
-rw-r--r-- 1 Utilisateur 197121  18K Oct 16 16:30 index.html
-rw-r--r-- 1 Utilisateur 197121 2.5K Oct 16 16:30 locale.xml
-rw-r--r-- 1 Utilisateur 197121 1.7K Oct 16 16:30 log.xml
-rwxr-xr-x 1 Utilisateur 197121  48K Oct 16 17:03 magick.exe*
-rwxr-xr-x 1 Utilisateur 197121 5.4M Oct 13 07:21 mfc140u.dll*
-rw-r--r-- 1 Utilisateur 197121 133K Oct 16 16:30 mime.xml
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 modules/
-rwxr-xr-x 1 Utilisateur 197121 558K Oct 13 07:13 msvcp140.dll*
-rwxr-xr-x 1 Utilisateur 197121  25K Oct 13 07:13 msvcp140_1.dll*
-rwxr-xr-x 1 Utilisateur 197121 183K Oct 13 07:13 msvcp140_2.dll*
-rwxr-xr-x 1 Utilisateur 197121  56K Oct 13 07:13 msvcp140_atomic_wait.dll*
-rwxr-xr-x 1 Utilisateur 197121  21K Oct 13 07:13 msvcp140_codecvt_ids.dll*
-rw-r--r-- 1 Utilisateur 197121 3.7K Oct 16 16:30 policy.xml
-rw-r--r-- 1 Utilisateur 197121 2.4K Oct 16 16:30 quantization-table.xml
-rw-r--r-- 1 Utilisateur 197121  60K Oct 16 16:30 sRGB.icc
-rw-r--r-- 1 Utilisateur 197121  12K Oct 16 16:30 thresholds.xml
-rw-r--r-- 1 Utilisateur 197121 9.3K Oct 16 16:30 type-ghostscript.xml
-rw-r--r-- 1 Utilisateur 197121  691 Oct 16 16:30 type.xml
-rw-r--r-- 1 Utilisateur 197121 100K Oct 21 16:14 unins000.dat
-rwxr-xr-x 1 Utilisateur 197121 3.1M Oct 21 16:14 unins000.exe*
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 uninstall/
-rwxr-xr-x 1 Utilisateur 197121 178K Oct 13 07:13 vcomp140.dll*
-rwxr-xr-x 1 Utilisateur 197121  97K Oct 13 07:13 vcruntime140.dll*
-rwxr-xr-x 1 Utilisateur 197121  38K Oct 13 07:13 vcruntime140_1.dll*
drwxr-xr-x 1 Utilisateur 197121    0 Oct 21 16:14 www/

```

* then I try installing ImageMagick by compiling it from source or github package :


```bash

# ------------------------------------------------------
# -- MinGw is less or more build-essential on
# -- windows, the GNU C++ dev stack
choco install mingw

export IMG_MGCK_VERSION=${IMG_MGCK_VERSION:-"7.1.0-51"}
# export IMG_MGCK_VERSION="7.1.0-51"

# ---------------------
# --- you could get source code from that direct URL, yet :
# -
# wget https://www.imagemagick.org/download/ImageMagick.tar.gz
# tar xvzf ImageMagick.tar.gz
# cd ImageMagick-7.0.10-35/


git clone git@github.com:ImageMagick/ImageMagick.git imagemagick_install/
cd imagemagick_install/
git checkout "${IMG_MGCK_VERSION}"

./configure
make

# ---
# ./configure fails with errors, and make is not even properly installed : 
# config.status: error: Something went wrong bootstrapping makefile fragments
#     for automatic dependency tracking.  If GNU make was not used, consider
#     re-running the configure script with MAKE="gmake" (or whatever is
#     necessary).  You can also try re-running configure with the
#     '--disable-dependency-tracking' option to at least be able to build
#     the package (albeit without support for automatic dependency tracking).
# See `config.log' for more details
# 
# Utilisateur@Utilisateur-PC MINGW64 ~/test_imagemagick/imagemagick_install ((7.1.0-51))
# $ make
# bash: make: command not found
# 
# 

sudo make install 
sudo ldconfig /usr/local/lib

# ---------------------
# -
# to find / check installation home : 
whereis magick

magick -version


# ---------------------
# -- To uninstall :
# sudo make uninstall
```


#### On Debian Linux 


```bash
sudo apt-get update -y 
sudo apt-get install build-essential


export IMG_MGCK_VERSION=${IMG_MGCK_VERSION:-"7.1.0-51"}
# export IMG_MGCK_VERSION="7.1.0-51"

# ---------------------
# --- you could get source code from that direct URL, yet :
# -
# wget https://www.imagemagick.org/download/ImageMagick.tar.gz
# tar xvzf ImageMagick.tar.gz
# cd ImageMagick-7.0.10-35/


git clone git@github.com:ImageMagick/ImageMagick.git imagemagick_install/
cd imagemagick_install/
git checkout "${IMG_MGCK_VERSION}"

./configure
make
sudo make install 
sudo ldconfig /usr/local/lib

# ---------------------
# -
# to find / check installation home : 
whereis magick

magick -version


# ---------------------
# -- To uninstall :
# sudo make uninstall
```

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
export GIT_SSH_COMMAND='ssh -i ~/.ssh.crouton/id_rsa'
# ssh -Ti ~/.ssh/.croutontechlead/id_rsa git@github.com
${GIT_SSH_COMMAND} -T git@github.com

```


## Windows Installations

### Golang

```bash
# https://go.dev/dl/go1.19.2.windows-amd64.msi

choco install golang
```

## ANNEX ZZ: General WebPerformance Optimization tools

* `sitespeed.io` with `lighthouse` plugin, grafana and graphite : https://github.com/sitespeedio/sitespeed.io/blob/main/docker/docker-compose.yml
* `websu` (i liked it too): 
  * https://github.com/websu-io/websu
  * https://websu.io/r/63535635f313f352b6371ec8 
* lighthouse is very popular, of course due to `Google Search Engine` monopolistic position on the market.