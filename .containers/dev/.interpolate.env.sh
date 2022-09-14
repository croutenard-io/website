#!/bin/bash


# first load all env vars

source ./.env.sh

if [ -f  ./.env ]; then
  rm  ./.env
fi;

# second interpolete all env vars in ./.env
cp ./.env.template ./.env

# sed -i "s#CCCCC_PLACEHOLDER#${CCCCCC_PLACEHOLDER}#g" ./.env

# POKUS_USER_NAME=POKUS_USER_NAME_PLACEHOLDER
sed -i "s#POKUS_USER_NAME_PLACEHOLDER#${POKUS_USER_NAME}#g" ./.env
# =_PLACEHOLDER
sed -i "s#POKUS_USER_GRP_NAME_PLACEHOLDER#${POKUS_USER_GRP_NAME}#g" ./.env
# POKUS_USER_UID=POKUS_USER_UID_PLACEHOLDER
sed -i "s#POKUS_USER_UID_PLACEHOLDER#${POKUS_USER_UID}#g" ./.env
# POKUS_USER_GID=POKUS_USER_GID_PLACEHOLDER
sed -i "s#POKUS_USER_GID_PLACEHOLDER#${POKUS_USER_GID}#g" ./.env
# ALPINE_OCI_IMAGE_TAG=ALPINE_OCI_IMAGE_TAG_PLACEHOLDER
sed -i "s#ALPINE_OCI_IMAGE_TAG_PLACEHOLDER#${ALPINE_OCI_IMAGE_TAG}#g" ./.env
# GOLANG_VERSION=GOLANG_VERSION_PLACEHOLDER
sed -i "s#GOLANG_VERSION_PLACEHOLDER#${GOLANG_VERSION}#g" ./.env
# HUGO_VERSION=HUGO_VERSION_PLACEHOLDER
sed -i "s#HUGO_VERSION_PLACEHOLDER#${HUGO_VERSION}#g" ./.env
# GIT_COMMIT_ID=GIT_COMMIT_ID_PLACEHOLDER
sed -i "s#GIT_COMMIT_ID_PLACEHOLDER#${GIT_COMMIT_ID}#g" ./.env
# CICD_BUILD_ID=CICD_BUILD_ID_PLACEHOLDER
sed -i "s#CICD_BUILD_ID_PLACEHOLDER#${CICD_BUILD_ID}#g" ./.env
# CICD_BUILD_TIMESTAMP=CICD_BUILD_TIMESTAMP_PLACEHOLDER
sed -i "s#CICD_BUILD_TIMESTAMP_PLACEHOLDER#${CICD_BUILD_TIMESTAMP}#g" ./.env
# QUAY_OCI_IMAGE_TAG=QUAY_OCI_IMAGE_TAG_PLACEHOLDER
sed -i "s#QUAY_OCI_IMAGE_TAG_PLACEHOLDER#${QUAY_OCI_IMAGE_TAG}#g" ./.env
# HUGO_BASE_URL=HUGO_BASE_URL_PLACEHOLDER
sed -i "s#HUGO_BASE_URL_PLACEHOLDER#${HUGO_BASE_URL}#g" ./.env
# HUGO_SERVER_BIND_ADDR=HUGO_SERVER_BIND_ADDR_PLACEHOLDER
sed -i "s#HUGO_SERVER_BIND_ADDR_PLACEHOLDER#${HUGO_SERVER_BIND_ADDR}#g" ./.env
# HUGO_SERVER_PORT_NUMBER=HUGO_SERVER_PORT_NUMBER_PLACEHOLDER
sed -i "s#HUGO_SERVER_PORT_NUMBER_PLACEHOLDER#${HUGO_SERVER_PORT_NUMBER}#g" ./.env
# HUGO_SERVER_OUTBOUND_PORT_NUMBER=HUGO_SERVER_OUTBOUND_PORT_NUMBER_PLACEHOLDER
sed -i "s#HUGO_SERVER_OUTBOUND_PORT_NUMBER_PLACEHOLDER#${HUGO_SERVER_OUTBOUND_PORT_NUMBER}#g" ./.env
