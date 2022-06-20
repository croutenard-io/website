#!/bin/bash


# first load all env vars

# should never be executed because [./.build.env.sh] generates the [./.env.dev] file, by executing [./.interpolate.env.sh]
source ./.env.sh
if [ -f ./.env ]; then
  echo "# --- --- --- --- --- --- --- --- #"
  echo "[./.env] file does not exist"
  echo "# --- --- --- --- --- --- --- --- #"
  # second interpolete all env vars in ./.env
  chmod +x ./.interpolate.env.sh
  ./.interpolate.env.sh
fi;

source ./.env

# run the build from docker-copmpose yaml [.containers/dev/docker-compose.build.yml]
docker-compose -f ./docker-compose.yml up -d pokus_dev



echo "# --- --- --- --- --- --- --- --- #"
echo " ABOUT LIVE RELOADING : "
echo "# --- --- --- --- --- --- --- --- #"

echo "Your site is at [http://127.0.0.1:${HUGO_SERVER_OUTBOUND_PORT_NUMBER}"

echo "# --- --- --- --- --- --- --- --- #"
echo " ABOUT LIVE RELOADING : "
echo "# --- --- --- --- --- --- --- --- #"

echo "Try visit [http://127.0.0.1:${HUGO_SERVER_OUTBOUND_PORT_NUMBER}/livereload.js?mindelay=5&v=2&port=${HUGO_SERVER_OUTBOUND_PORT_NUMBER}&path=livereload]"
