#!/bin/bash

# ---

echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- >>> >>> [RELEASE - GITHUB PAGES] <<< <<< "
echo "# --- # ---  [$0]"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"

# ----
#
export GH_PAGES_DEPLOYMENT_GIT_BRANCH=${GH_PAGES_DEPLOYMENT_GIT_BRANCH:-"monkey/tests-integration"}
export GH_PAGES_DEPLOYMENT_CNAME=${GH_PAGES_DEPLOYMENT_CNAME:-"pokus-io.github.io/ethical-hacking-example"}
export HEROKU_APP_ID=${HEROKU_APP_ID:-"xxxxxxxxxxxxxxxxxxx"}

echo "# --- # ---   GH_PAGES_DEPLOYMENT_GIT_BRANCH=[${GH_PAGES_DEPLOYMENT_GIT_BRANCH}]"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
echo "# --- # --- # --- # --- # --- # --- # --- # --- # --- # --- # --- #"
