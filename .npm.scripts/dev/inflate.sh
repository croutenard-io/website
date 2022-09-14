#!/bin/bash

# ---
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- >>> >>> [INFLATE - DEV] <<< <<< "
echo "# --- # ---  [$0]"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# ------ ------ ------ ------ ------ ------ ------ #"


echo "# ------ ------ ------ ------ ------ ------ ------ #"
echo "# ------ -  PATH=[${PATH}]"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
export DEPLOYMENT_DOMAIN=croutenard-io.surge.sh
# export DEPLOYMENT_DOMAIN=croutenardio.surge.sh
export DEPLOYMENT_BASE_URL=https://${DEPLOYMENT_DOMAIN}

if [ -d ./docs ]; then
  rm -fr ./docs
fi;

if [ -d ./public ]; then
  rm -fr ./public
fi;

mkdir -p  ./docs
mkdir -p  ./public

deleteExampleContent () {

  rm -fr ./public/images/material/
  rm -fr ./public/images/products/
  rm -fr ./public/images/clients/
  rm -f ./public/images/blog/post-1.jpg
  # rm -f ./public/images/blog/post-2.jpg
  rm -f ./public/images/blog/post-3.jpg
  rm -f ./public/images/blog/post-4.jpg
  
}

surgeBuildNdeploy () {
  export PATH=$PATH:/usr/local/go/bin
  hugo -b ${DEPLOYMENT_BASE_URL}

  deleteExampleContent
  cp -fr ./public/* ./docs/
  surge ./public "${DEPLOYMENT_DOMAIN}"
}

surgeBuildNdeploy
