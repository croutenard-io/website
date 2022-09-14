#!/bin/bash


export ERUPTION_DISCORD_BOT_CLIENTID=${ERUPTION_DISCORD_BOT_CLIENTID:-'997340687114706964'}
export ERUPTION_DISCORD_BOT_PERMISSION_INTEGER=${ERUPTION_DISCORD_BOT_PERMISSION_INTEGER:-'535326874947'}

unset ERUPTION_BOT_DISCORD_INVITE_LINK
export ERUPTION_BOT_DISCORD_INVITE_LINK="https://discord.com/api/oauth2/authorize?client_id=${ERUPTION_DISCORD_BOT_CLIENTID}\\&permissions=${ERUPTION_DISCORD_BOT_PERMISSION_INTEGER}\\&scope=bot%20applications.commands"
# export ERUPTION_BOT_DISCORD_INVITE_LINK0="https://discord.com/api/oauth2/authorize?client_id=${ERUPTION_DISCORD_BOT_CLIENTID}&permissions=${ERUPTION_DISCORD_BOT_PERMISSION_INTEGER}&scope=bot%20applications.commands"
# echo "ERUPTION_BOT_DISCORD_INVITE_LINK0=[${ERUPTION_BOT_DISCORD_INVITE_LINK0}]"



if [ -f ./data/homepage.yml ]; then
  rm ./data/homepage.yml
fi;
cp ./data/homepage.template.yml ./data/homepage.yml


echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "sed -i 's~ERUPTION_BOT_DISCORD_INVITE_LINK_PLACEHOLDER~${ERUPTION_BOT_DISCORD_INVITE_LINK}~g'"
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + ---  ERUPTION_DISCORD_BOT_CLIENTID = [${ERUPTION_DISCORD_BOT_CLIENTID}] "
echo "# - + ---  ERUPTION_DISCORD_BOT_PERMISSION_INTEGER = [${ERUPTION_DISCORD_BOT_PERMISSION_INTEGER}] "
echo "# - + ---  ERUPTION_BOT_DISCORD_INVITE_LINK = [${ERUPTION_BOT_DISCORD_INVITE_LINK}] "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "
echo "# - + --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - --- + - "


sed -i "s,ERUPTION_BOT_DISCORD_INVITE_LINK_PLACEHOLDER,${ERUPTION_BOT_DISCORD_INVITE_LINK},g" ./data/homepage.yml
