#!/bin/bash

export RUNKIT_NOTENOOK_ID=${RUNKIT_NOTENOOK_ID:-"ctrtechlead/62cf1a47ebc2880009354ee7"}
export DEPLOYMENT_DOMAIN=${DEPLOYMENT_DOMAIN:-"runkit.com"}
export DEPLOYMENT_BASE_URL=https://${DEPLOYMENT_DOMAIN}/${RUNKIT_NOTENOOK_ID}
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + ---  DEPLOYMENT_BASE_URL = [${DEPLOYMENT_BASE_URL}] "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "

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


hugoBuild () {
  # export PATH=$PATH:/usr/local/go/bin
  hugoClean
  hugo -b ${DEPLOYMENT_BASE_URL}
  cp -fr ./public/* ./docs/
}

hugoBuild