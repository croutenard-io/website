#!/bin/bash


export HUGO_HTTP_SCHEMA=${HUGO_HTTP_SCHEMA:-'http'}
export HUGO_HOST=${HUGO_HOST-'127.0.0.1'}
export HUGO_PORT=${HUGO_PORT:-'3536'}

export GH_PAGES_DEPLOYMENT_DIR=${GH_PAGES_DEPLOYMENT_DIR:-'./docs/'}
export POKUS_DEPLOYMENT_DIR=${POKUS_DEPLOYMENT_DIR:-"${GH_PAGES_DEPLOYMENT_DIR}"}

echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >>      "
echo " >>     - [$0] "
echo " >>      "
echo " >> HUGO_HTTP_SCHEMA=[${HUGO_HTTP_SCHEMA}] "
echo " >> HUGO_HOST=[${HUGO_HOST}] "
echo " >> HUGO_PORT=[${HUGO_PORT}] "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >>      "
echo " >>     - [magick --version] "
echo " >>      "
magick --version
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo ''
echo ''
# echo ''
# echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
# echo " >>      "
# echo " >>     - [HUGO BUILD] "
# echo " >>      "
# echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
# gulp build:hugo:gh_pages

echo ''
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >>      "
echo " >>     - [OPTIMIZE ALL IMAGES in [${POKUS_DEPLOYMENT_DIR}]] "
echo " >>      "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "


export POKUS_IMG_LIST=${POKUS_IMG_LIST:-'./my.pokus.gulp.images.list'}
# -->> FILES_TO_EXCLUDE is a path you can set it will exclude with grep -vE '^*${FILES_TO_EXCLUDE}'
# For example, at some point  the [images/crouton/favicon/CROUTENARD_SIMPLE_RVB.32x32.ico.png.png] was the website FavIcon
export FILES_TO_EXCLUDE='images/crouton/favicon/'
# tree -f ./docs/ | grep -E '^*\.ico|^*\.png|^*\.jpg|^*\.jpeg|^*\.gif|^*\.svg' | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}
tree -f ${POKUS_DEPLOYMENT_DIR} | grep -E '^*\.png|^*\.jpg|^*\.jpeg' | grep -vE "^*${FILES_TO_EXCLUDE}*" | awk '{ print $NF}' | tee ${POKUS_IMG_LIST}

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

rm ${POKUS_IMG_LIST}
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >>      "
echo " >>     COMPLETED - [$0] "
echo " >>      "
echo " >> HUGO_HTTP_SCHEMA=[${HUGO_HTTP_SCHEMA}] "
echo " >> HUGO_HOST=[${HUGO_HOST}] "
echo " >> HUGO_PORT=[${HUGO_PORT}] "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >>      "
echo " >>     - [magick --version] "
echo " >>      "
magick --version
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "
echo " >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> >> "

