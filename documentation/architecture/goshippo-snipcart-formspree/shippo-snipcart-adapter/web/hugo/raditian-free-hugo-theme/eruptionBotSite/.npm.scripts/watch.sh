#!/bin/bash

# export PATH=$PATH:/usr/local/go/bin && go version
export HUGO_SERVER_IP=${HUGO_SERVER_IP:-"127.0.0.1"}
export HUGO_PORT_NO=${HUGO_PORT_NO:-"5654"}


hugo serve -b http://${HUGO_SERVER_IP}:${HUGO_PORT_NO} -p ${HUGO_PORT_NO} --bind ${HUGO_SERVER_IP} -w
