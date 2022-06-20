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
docker-compose -f ./docker-compose.yml up -d pokus_dev_build
# docker-compose -f ./docker-compose.yml up -d pokus_prod_build



echo "# --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- #"
echo "  YOUR HUGO BUILD IS NOW AVAILABLE : "
echo "# --- --- --- --- --- --- --- --- #"
echo "  In [$(pwd)/docs]"
echo "  In [$(pwd)/public]"
echo "# --- --- --- --- --- --- --- --- #"
echo "# --- --- --- --- --- --- --- --- #"
