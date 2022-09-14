#!/bin/bash


# --- DiscordJS uses node-gyp : so for windows machines, we need to set a few things
# npm config set msvs_version 2017

nodeGypWindowsSetup () {
    # see https://github.com/nodejs/node-gyp#on-windows

    # Assumes Microsoft Visual Studio Build Tools are installed on the Windows System.
    # e.g. my installation path of Microsoft Build Tools is located at "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools"
    # 
    # - see https://visualstudio.microsoft.com/fr/downloads/?q=build+tools
    # - see https://docs.microsoft.com/en-us/answers/questions/136985/build-tools-for-visual-studio.html
    npm config set msvs_version 2022
    export THIS_PY_PATH=$(which python)
    npm config set python ${THIS_PY_PATH}

}

nodeGypWindowsSetup

npm i