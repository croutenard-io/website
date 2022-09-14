#!/bin/bash

export PASSED_OPTS=$1

Usage () {
  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
  echo "!!! >>> Usage: "
  echo "           $0 [OPTION] "
  echo "           Note: only one OPTION must be passed (--prune or --help) "

  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
  echo "!!! >>> OPTIONS: "
  echo "!!! >>>  "
  echo "!!! >>> - [--prune] : execute [docker system prune -f --all] to force rebuild from start the docker image"
  echo "!!! >>> - [--help] : displays this Help Menu"
  echo "!!! >>>  "
  echo "!!! >>> ----- ----- ----- ----- -----  <<< !!! "
}


# first load all env vars

source ./.env.sh



# second interpolete all env vars in ./.env
chmod +x ./.interpolate.env.sh
./.interpolate.env.sh

source ./.env

./.teardown.sh

if ! [ "x${PASSED_OPTS}" == "x" ]; then
  if [ "${PASSED_OPTS}" == "--prune" ]; then
    echo "!!! >>> Force Option has been passed <<< !!! "
    echo "!!! >>> Force Option has been passed <<< !!! "
    echo "!!! >>> Force Option has been passed <<< !!! "
    echo "!!! >>> Force Option has been passed <<< !!! "
    docker system prune -f --all
  else
    if [ "${PASSED_OPTS}" == "--help" ]; then
      echo "!!! >>> Help Option has been passed <<< !!! "
      echo "!!! >>> Help Option has been passed <<< !!! "
      echo "!!! >>> Help Option has been passed <<< !!! "
      echo "!!! >>> Help Option has been passed <<< !!! "
      clear
      Usage
      exit 0
    else
      echo "Error: you provided [${PASSED_OPTS}] as argument to [$0] "
      Usage
      exit 3
    fi;
  fi;
else
  echo "Error: you provided no argument to [$0] / PASSED_OPTS=[${PASSED_OPTS}] "
fi;

echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- ---  DOCKER COMPOSE CONFIG :"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"

# display config --
docker-compose -f ./docker-compose.build.yml config
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"


echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- ---  DOCKER COMPOSE BUILD :"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- #"
# exit 0

# run the build from docker-copmpose yaml [.containers/dev/docker-compose.build.yml]
docker-compose -f ./docker-compose.build.yml build pokus_dev
