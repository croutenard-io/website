
#!/bin/bash

export HUGO_SERVER_BIND_ADDR=${HUGO_SERVER_BIND_ADDR:-"0.0.0.0"}
export HUGO_SERVER_PORT_NUMBER=${HUGO_SERVER_PORT_NUMBER:-"1313"}
export PATH=$PATH:/usr/local/go/bin

echo "# --- --- --- --- --- --- --- --- #"
echo "# ---- STARTING HUGO DEV SERVER WITH : "
echo "#    Golang version = [$(go --version)]"
echo "#    Hugo version = [$(hugo --version)]"
echo "#    HUGO_DEPLOYMENT_BASE_URL=[${HUGO_DEPLOYMENT_BASE_URL}]"
echo "#    HUGO_SERVER_BIND_ADDR=[${HUGO_SERVER_BIND_ADDR}]"
echo "#    HUGO_SERVER_PORT_NUMBER=[${HUGO_SERVER_PORT_NUMBER}]"
echo "#    HUGO_SERVER_OUTBOUND_PORT_NUMBER=[${HUGO_SERVER_OUTBOUND_PORT_NUMBER}]"
echo "# --- --- --- --- --- --- --- --- #"
echo " ABOUT LIVE RELOADING : "
echo "# --- --- --- --- --- --- --- --- #"
echo "Your site is at [http://127.0.0.1:${HUGO_SERVER_OUTBOUND_PORT_NUMBER}"
echo "# --- --- --- --- --- --- --- --- #"
echo " ABOUT LIVE RELOADING : "
echo "# --- --- --- --- --- --- --- --- #"
echo "Try visit [http://127.0.0.1:${HUGO_SERVER_OUTBOUND_PORT_NUMBER}/livereload.js?mindelay=5&v=2&port=${HUGO_SERVER_OUTBOUND_PORT_NUMBER}&path=livereload]"
echo "# --- --- --- --- --- --- --- --- #"

hugo serve --watch --baseURL ${HUGO_DEPLOYMENT_BASE_URL} --bind "${HUGO_SERVER_BIND_ADDR}" --port "${HUGO_SERVER_PORT_NUMBER}"
