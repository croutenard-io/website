#!/bin/bash

export POKUS_USER_NAME=pokus
export POKUS_USER_GRP_NAME=pokusio
export POKUS_USER_UID=$(id -u)
export POKUS_USER_GID=$(id -g)
# for image "golang:1.18.3-alpine3.16" see https://hub.docker.com/_/golang
export ALPINE_OCI_IMAGE_TAG=${ALPINE_OCI_IMAGE_TAG:-"3.16"}
export GOLANG_VERSION=${GOLANG_VERSION:-"1.18.3"}
export HUGO_VERSION=${HUGO_VERSION:-"0.100.2"}
export GIT_COMMIT_ID=$(git rev-parse --short=40 HEAD)
export CICD_BUILD_ID=${CICD_BUILD_ID:-"${GIT_COMMIT_ID}"}
# export CICD_BUILD_TIMESTAMP=$(date --utc '+%FT%T%Z')
export CICD_BUILD_TIMESTAMP=$(date -u +'%Y-%m-%dT%H:%M:%S%Z')
# will be croutenard/shop
export QUAY_OCI_IMAGE_TAG=${QUAY_OCI_IMAGE_TAG:-"0.0.1"}
# export HUGO_DEPLOYMENT_BASE_URL="https://croutenard.com/"
# export HUGO_DEPLOYMENT_BASE_URL="http://127.0.0.1:3112"
# --
# HUGO_SERVER_BIND_ADDR is the bind address of the hugo dev server inside container
export HUGO_SERVER_BIND_ADDR="0.0.0.0"
# HUGO_SERVER_BIND_ADDR is the listen Port number of the hugo dev server inside container
export HUGO_SERVER_PORT_NUMBER="1313"
# export HUGO_SERVER_OUTBOUND_PORT_NUMBER="3112"
# Hugo dev server has a constraint :
#   The port number configured in the live reload script injected in HTML
#   is equal to the port number used by the [-p 1515] GNU Option of the [hugo server] command
# that's why we don't have a choice :
#   -> inside and outside container, we must have the same port number, to benefit live reload for the Hugo Dev server
#   -> see https://github.com/gohugoio/hugo/issues/8023#issuecomment-1157209642
export HUGO_SERVER_OUTBOUND_PORT_NUMBER="${HUGO_SERVER_PORT_NUMBER}"
export HUGO_DEPLOYMENT_BASE_URL="http://127.0.0.1:${HUGO_SERVER_OUTBOUND_PORT_NUMBER}"
