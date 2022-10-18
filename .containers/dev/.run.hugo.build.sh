#!/bin/bash


# first load all env vars

# should never be executed because [./.build.env.sh] generates the [./.env.dev] file, by executing [./.interpolate.env.sh]
source ./.env.sh

if [ -f ./.env ]; then
  echo "# --- --- --- --- --- --- --- --- #"
  echo "[./.env] file does exist, deleting it"
  echo "# --- --- --- --- --- --- --- --- #"
  rm -f ./.env
fi;

# second interpolete all env vars in ./.env
chmod +x ./.interpolate.env.sh
./.interpolate.env.sh

source ./.env


echo "# --- --- --- --- --- --- --- --- #"
echo "# ---- STARTING HUGO BUIL WITH : "
echo "#    Golang version = [$(go --version)]"
echo "#    Hugo version = [$(hugo --version)]"
echo "#    HUGO_DEPLOYMENT_BASE_URL=[${HUGO_DEPLOYMENT_BASE_URL}]"
echo "#    HUGO_SERVER_BIND_ADDR=[${HUGO_SERVER_BIND_ADDR}]"
echo "#    HUGO_SERVER_PORT_NUMBER=[${HUGO_SERVER_PORT_NUMBER}]"
echo "#    HUGO_SERVER_OUTBOUND_PORT_NUMBER=[${HUGO_SERVER_OUTBOUND_PORT_NUMBER}]"
echo "# --- --- --- --- --- --- --- --- #"
echo "  HUGO BUILD : "
echo "# --- --- --- --- --- --- --- --- #"


# run the build from docker-copmpose yaml [.containers/dev/docker-compose.build.yml]
docker-compose -f ./docker-compose.yml up -d pokus_hugo_build
# docker-compose -f ./docker-compose.yml up -d pokus_dev_build
# docker-compose -f ./docker-compose.yml up -d pokus_prod_build



echo "# --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- #"
echo "  YOUR HUGO BUILD IS NOW AVAILABLE : "
echo "# --- --- --- --- --- --- --- --- #"
echo "  In [$(pwd)/docs]"
echo "  In [$(pwd)/public]"
echo "# --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- #"
