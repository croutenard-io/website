
#!/bin/bash

export HUGO_SERVER_BIND_ADDR=${HUGO_SERVER_BIND_ADDR:-"0.0.0.0"}
export HUGO_SERVER_PORT_NUMBER=${HUGO_SERVER_PORT_NUMBER:-"1313"}
export PATH=$PATH:/usr/local/go/bin

echo "# --- --- --- --- --- --- --- --- #"
echo "# ---- STARTING HUGO BUILD WITH : "
echo "#    Golang version :"
go --version
echo "#    Hugo version : "
hugo --version
echo "#    HUGO_BASE_URL=[${HUGO_BASE_URL}]"
echo "#    HUGO_SERVER_BIND_ADDR=[${HUGO_SERVER_BIND_ADDR}]"
echo "#    HUGO_SERVER_PORT_NUMBER=[${HUGO_SERVER_PORT_NUMBER}]"
echo "#    HUGO_SERVER_OUTBOUND_PORT_NUMBER=[${HUGO_SERVER_OUTBOUND_PORT_NUMBER}]"
echo "# --- --- --- --- --- --- --- --- #"
echo "  HUGO BUILD : "
echo "# --- --- --- --- --- --- --- --- #"

if [ -d ./docs ]; then
  rm -fr ./docs
fi;

if [ -d ./public ]; then
  rm -fr ./public
fi;

mkdir -p  ./docs
mkdir -p  ./public

export PATH=$PATH:/usr/local/go/bin
hugo --baseURL ${HUGO_BASE_URL}
cp -fr ./public/* ./docs/
