#!/bin/bash

export POKUS_USER_NAME=${POKUS_USER_NAME:-"pokus"}
export POKUS_USER_GRP_NAME=${POKUS_USER_GRP_NAME:-"pokusio"}
export POKUS_USER_UID=${POKUS_USER_UID:-"1000"}
export POKUS_USER_GID=${POKUS_USER_GID:-"1000"}

apk add sudo

addgroup -g ${POKUS_USER_GID} ${POKUS_USER_GRP_NAME}


adduser -G ${POKUS_USER_GRP_NAME} -s /bin/bash ${POKUS_USER_NAME} --disabled-password
# this created the /home/${POKUS_USER_NAME}  Directory
# --
# To delete this user :
# --
#  deluser --remove-home ${POKUS_USER_NAME}
# --

# --
# Now allow the members of wheel group to perform any command with sudo :
# mkdir -p /etc/sudoers.d/ && echo '%wheel ALL=(ALL) ALL' > /etc/sudoers.d/wheel
mkdir -p /etc/sudoers.d/ && echo '%wheel ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/wheel
# ---
# Add POKUS_USER_NAME to the wheel group
echo "addgroup ${POKUS_USER_NAME} wheel"
addgroup ${POKUS_USER_NAME} wheel

# ---
# ~/.hugo.extended/v0.100.2 # addgroup --help
# BusyBox v1.35.0 (2022-05-09 17:27:12 UTC) multi-call binary.
#
# Usage: addgroup [-g GID] [-S] [USER] GROUP
#
# Add a group or add a user to a group
#
# 	-g GID	Group id
# 	-S	Create a system group
#
# ---
#
