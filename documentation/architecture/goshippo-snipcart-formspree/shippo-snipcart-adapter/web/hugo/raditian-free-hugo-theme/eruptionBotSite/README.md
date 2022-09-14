

```bash
export RUNKIT_NOTENOOK_ID="ctrtechlead/62cf1a47ebc2880009354ee7"
export DEPLOYMENT_DOMAIN=runkit.com
export DEPLOYMENT_BASE_URL=https://${DEPLOYMENT_DOMAIN}/${RUNKIT_NOTENOOK_ID}

export ERUPTION_DISCORD_BOT_CLIENTID='997340687114706964'
export ERUPTION_DISCORD_BOT_PERMISSION_INTEGER='535326874947'

export ERUPTION_BOT_DISCORD_INVITE_LINK="https://discord.com/api/oauth2/authorize?client_id=${ERUPTION_DISCORD_BOT_CLIENTID}&permissions=${ERUPTION_DISCORD_BOT_PERMISSION_INTEGER}&scope=bot%20applications.commands"

sed -i "s#ERUPTION_BOT_DISCORD_INVITE_LINK_PLACEHOLDER#${ERUPTION_BOT_DISCORD_INVITE_LINK}#g" ./data/homepage.yml

hugoClean () {
    if [ -d ./docs ]; then
    rm -fr ./docs
    fi;

    if [ -d ./public ]; then
    rm -fr ./public
    fi;

    mkdir -p  ./docs
    mkdir -p  ./public
}


hugoBuild () {
  # export PATH=$PATH:/usr/local/go/bin
  hugoClean
  hugo -b ${DEPLOYMENT_BASE_URL}
  cp -fr ./public/* ./docs/
}

hugoBuild
```