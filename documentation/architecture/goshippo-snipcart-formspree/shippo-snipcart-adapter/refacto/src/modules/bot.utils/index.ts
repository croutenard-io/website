//// REQUIRES NODE v18.5.0 +
/**
 * Global Eruption Bot Configuration
 */
import {EruptionConfig,  eruptionConfiguration} from './../../modules/config/'
import eruptionBotLogger from './../../modules/logger'

import express from 'express';
import ejs from "ejs";
import {CommonRoutesConfig} from '../../common/common.routes.config';
import shell from "shelljs";



/**
 * I created a discord app, and a bot for that discord app, just 
 * like explained at 
 * https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
 * 
 * ---
 * 
 * 
 * 
 **/


// const guildID = `https://discord.com/api/guilds/976956636407136296/widget.json`
// const eruptionGuildID = `976956636407136296`
const eruptionDiscordServerIDalsoGuildID = `976956636407136296`
const edruptionShippingMgmtChannelID = `977021632696692788`

const eruptionDiscordBotUserUniqueName = `eruption__app_bot#2352`
const eruptionDiscordBotToken = `${process.env.ERUPTION_DISCORD_BOT_TOKEN}`
const eruptionDiscordBotClientID = `${process.env.ERUPTION_DISCORD_BOT_CLIENTID}`
// const eruptionDiscordBotPermissionInteger = `397284858944`

/**
 * '535326874947'    contains permissions to manage webhooks
 * to (re-)generate a Discord Bot Permission Integer, go at https://discord.com/developers/applications
 * 
 * 
 * '8'               contains full admin permissions
 */
// const eruptionDiscordBotPermissionInteger = `535326874947`
const eruptionDiscordBotPermissionInteger = `8`

const eruptionBotInviteLinkIntoAServer = `https://discord.com/api/oauth2/authorize?client_id=${eruptionDiscordBotClientID}&permissions=${eruptionDiscordBotPermissionInteger}&scope=bot%20applications.commands
`

// const discordClient = require("discord.js");
// import { Client, Intents, TextChannel } from 'discord.js';
const { Client, Intents, TextChannel } = require('discord.js');
const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
let shippingMgmtChannel : (typeof TextChannel) = null;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const { query, validationResult } = require("express-validator");
const cors = require("cors");
const request = require("request");
var bodyParser = require('body-parser');






/**
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + DISCORD Utils
 * note: see Discord API Rate Limiting behavior
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * 
 **/

/**
 * 
 * --- https://stackoverflow.com/questions/51120073/how-to-send-a-message-to-a-specific-channel
 *     https://readforlearn.com/discord-js-sending-a-message-to-a-specific-channel/
 * --- google search : discord js send message in specific channel
 * 
 * --- Here implement function to send a message to someone on a specific Text channel
 *     I will finally re-implement all of it, using TypeScript , Express, DiscordJS
 * 
 * --- https://www.npmjs.com/package/discord.js
 * 
 * --- https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands
 * 
 * --- https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script
 * 
 **/

/**
 * I created a discord app, and a bot for that discord app, just 
 * like explained at 
 * https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
 * 
 * ---
 * 
 * 
 * 
 **/


const registerSlashCommandsForDiscordBot = () => {
    /**
     * - see https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands
     * - https://www.npmjs.com/package/discord.js
     * 
     * - npm install @discordjs/builders @discordjs/rest discord-api-types
     * 
     * 
     * 
     * -----------------------
     * - [clientId] : Your application's client id
     * - [guildId] : Your development server's id
     * - [commands] : An array of commands to register. The slash command builder from @discordjs/builders is used to build the data for your commands
     **/


    // const { SlashCommandBuilder } = require('@discordjs/builders');
    // const { REST } = require('@discordjs/rest');
    // const { Routes } = require('discord-api-types/v9');

    /**
     * 
     * - (./config.json) should be generated first, using [ShellJS]
     * 
     * - ccc
     * 
     * - ccc
     * 
     **/
    // const { clientId, guildId, token } = require('./config.json');

    const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
        new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        new SlashCommandBuilder().setName('ship').setDescription('A slash command to search shipments !'),
        new SlashCommandBuilder().setName('orders').setDescription('A slash command to search orders !'),
        new SlashCommandBuilder().setName('customers').setDescription('A slash command to search customers !'),
        new SlashCommandBuilder().setName('init').setDescription('A slash command to initialize your Eruption Bot !')
    ].map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(eruptionDiscordBotToken);

    /// 
    rest.put(Routes.applicationGuildCommands(eruptionDiscordBotClientID, eruptionDiscordServerIDalsoGuildID), { body: commands })
        .then(() => console.log(' [ >EruptionBot< - >> ] Successfully registered application commands.'))
        .catch(console.error);

}

const slashInitHandler = async (interaction, shippingMgmtChannel: any) => {
    console.info(`  [ >EruptionBot< - >> slashInitHandler ] Bon ça c'est le slashInitHandler qui est déclenché à chaque fois que l'on utilise le bot avec la command slash /init `)

    let initilizerUser = interaction.user.id;


    /**
     * We have to create a Webhook, related to a given Channel
     */

    shippingMgmtChannel.send('[ >EruptionBot< - >> slashInitHandler ] I ma now creating a webhook that i will use to send further messages to your shipping management Discord Channel');

    const webhookName = `eruptionShippingBotWebHook`
    shippingMgmtChannel.createWebhook(`${webhookName}`, {
    avatar: 'https://i.imgur.com/AfFp7pu.png'
    }).then(webhook => {
        console.log(`Created webhook ${webhook}`)
    })
    .catch(console.error);

}

const initDiscordApp = () => {
    /**
     * - 
     **/
    console.info(`Invite the Eruption Discord Bot in your discord server, by clicking the following link :  ${eruptionBotInviteLinkIntoAServer}  `)
    console.info(`${eruptionBotInviteLinkIntoAServer}`)

    /**
     * - Aftetr that we register Bots Commands
     **/
    registerSlashCommandsForDiscordBot();


    /**
     * - Afterr registering Commands, we can now create Bot
     **/

    // const { Client, Intents } = require('discord.js');
    // const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });

    discordClient2.on('ready', () => {
    console.log(` [ >EruptionBot< - >> ] Logged in as ${discordClient2.user.tag}!`);


    /**
     * We have to create a Webhook, related to a given Channel
     */

    // It's only when the bot is logged in "ready", that we can get a reference over a given channel
    shippingMgmtChannel = discordClient2.channels.cache.get(`${edruptionShippingMgmtChannelID}`);
    shippingMgmtChannel.send('[ >EruptionBot< - >> ] Hey I am the Eruption Shipping Bot, providing Snipcart / GoShippo Interaction !!! ');

    });

    discordClient2.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong Eruption!');
        }

        if (interaction.commandName === 'init') {
            await slashInitHandler(interaction);
        }


    });

    try {
        discordClient2.login(`${eruptionDiscordBotToken}`);
    } catch (discordLoginErr) {
        console.error(` [ >EruptionBot< - >> ] Omy ! there has been an error login in Discord as the Eruption Bot`);
        console.error(discordLoginErr);
    }

}



/**
 * ----------------------------------------------------------------------
 *   Iinitializes Discord Bot : creates a WebHook to be used to send messages to discord - 
 * ----------------------------------------------------------------------
 * 
 * - see https://discordjs.guide/popular-topics/webhooks.html
 * 
 * That's how to send a message to a channel without having to login as a Discord Bot
 * 
 * - first create a webhook like this : https://discordjs.guide/popular-topics/webhooks.html#creating-webhooks-with-discord-js
 * - then use webhook to send message channel : https://discordjs.guide/popular-topics/webhooks.html#sending-messages
 * 
 */
const initDiscordBot = (message) => {
    /**
     * We have to create a Webhook, related to a given Channel
     */

}

const sendMessageToDiscordChannel = (message) => {
    /**
     * This code below is throwing an Error : 
     *      TypeError: Cannot read properties of undefined (reading 'send')
     *          at sendMessageToDiscordChannel 
     * 
     * 
     * Instead : https://discordjs.guide/popular-topics/webhooks.html
     * 
     * That's how to send a message to a channel without having to login as a Discord Bot
     * 
     * - first create a webhook like this : https://discordjs.guide/popular-topics/webhooks.html#creating-webhooks-with-discord-js
     * - then use webhook to send message channel : https://discordjs.guide/popular-topics/webhooks.html#sending-messages
     * 
     */

    
    /**
     * We have to create a Webhook, related to a given Channel, to send mesage to channel
     * The webhook must be created only once: its initialization. The state of the Webhook (created or not yet created) must be persisted top a database that survives bot restarts. That because Discord State is persistent of course.
     */
         const webhookName = `eruptionShippingBotWebHook`
         shippingMgmtChannel.createWebhook(`${webhookName}`, {
             avatar: 'https://i.imgur.com/AfFp7pu.png',
         }).then(webhook => console.log(`Created webhook ${webhook}`))
           .catch(console.error);
}




/**
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + SNIPCART / DISCORD - ADPATER
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + --- + 
 * 
 **/

/**
 * There you can execute any shell command in the Runkit Notebook nodejs project
 */
const executeShellCmd = (shellCmdToExec) => {
    // Run external tool synchronously
    let shellCmd = {};
    let shellCmdStdout = {};
    let shellCmdStderr = {};
    // const POKUS_RAW_CHECK_CMD = 'ls -alh ./package.json'; // will be executed to check [./package.json] file exists on filesystem
    // const POKUS_RAW_CMD = 'cat ./package.json';
    const POKUS_RAW_CMD = shellCmdToExec;

    try {
        shellCmd = shell.exec(`${POKUS_RAW_CMD}`);
        shellCmdStdout = shellCmd.stdout;
        shellCmdStderr = shellCmd.stderr;
        if (shellCmd.code !== 0) {
            console.error(`Error (Pokus): [${POKUS_RAW_CMD}] command failed`);
            console.error(shellCmd.stderr)
            console.error(shellCmd.stdout)
            // shell.echo('Error (Pokus): [npm list express] command failed');
            shell.exit(17);
        }
    } catch (err) {
        console.info(`executeShellCmd - catched [err] is [${err}] on expressjs runkit`)
        shellCmdStdout = shellCmd.stdout;
        shellCmdStderr = shellCmd.stderr;
        console.info(`executeShellCmd - on expressjs runkit - [shellCmd] is :`)
        console.info(shellCmd)
        console.info(`executeShellCmd - on expressjs runkit - [shellCmdStderr] is :`)
        console.info(shellCmdStderr)
    } finally {
        console.info(`executeShellCmd - on expressjs runkit - [shellCmd] is :`)
        console.info(shellCmd)
        console.info(`executeShellCmd - on expressjs runkit - [shellCmdStderr] is :`)
        console.info(shellCmdStderr)
    }
    
    return {
        exec_code: shellCmd.code,
        stdout: shellCmdStdout,
        stderr: shellCmdStderr
    }
}

/**
 * cat <<EOF> ./config.toml
 * baseURL = 'http://example.org/'
 * languageCode = 'en-us'
 * title = 'My New Hugo Site'
 * themesDir = "./themes/"
 * theme = "hargo"
 * EOF
 */

const generateTextFile = (withThatText, filePath) => {
let cmdToexecute = ``;
cmdToexecute = `
cat <<EOF> ${filePath}
${withThatText}s
EOF
`;
console.info(` >>> Eruption generateTextFile >>> cmdToexecute    is now :  `)
console.info(cmdToexecute)
executeShellCmd(cmdToexecute)


console.info(` >>> Eruption generateTextFile >>> !!!! findProblematicBufferUse !!!! : START `)


/**
 * 
 * Below just a command to execute to check where is the deprecated Buffer used : 
 * 
 * - https://nodejs.org/en/docs/guides/buffer-constructor-deprecation/#finding-problematic-bits-of-code-using-grep
 *   
 *   // grep -nrE '[^a-zA-Z](Slow)?Buffer\s*\(' --exclude-dir node_modules
 */

// const findProblematicBufferUse =`grep -nrE '[^a-zA-Z](Slow)?Buffer\\s*\\(' --exclude-dir node_modules`;
// executeShellCmd(findProblematicBufferUse)
// console.info(` >>> Eruption generateTextFile >>> !!!! findProblematicBufferUse !!!! : END `)



}




/**
 * -------------  PREPARE EJS TEMPLATES
 * Just like https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application
 */
const prepareEJStemplates = () => {

   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   console.info(` >>> Eruption  on expressjs runkit - [prepareEJStemplates()] - >>>`)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   console.info(` >>> Eruption  on expressjs runkit - [prepareEJStemplates()] - >>> START : generates all files and folders for EJS Tamplates of the Express JS app`)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   
  /**
   * mkdir -p views/partials
   */
   executeShellCmd(`mkdir -p views/partials && mkdir -p views/pages`)
   
   /**
    * generate views/partials/head.ejs
    */
let headEJSFileContent = `
<meta charset="UTF-8">
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<title>Eruption Bot</title>
`
   generateTextFile(headEJSFileContent, `./views/partials/head.ejs`)

   /**
    * generate views/partials/header.ejs
    */

   let headerEJSFileContent = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/">Eruption Bot</a>
<ul class="navbar-nav mr-auto">
  <li class="nav-item">
    <a class="nav-link" href="/">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/docs">Docs</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/about">About</a>
  </li>
</ul>
</nav>
`

    generateTextFile(headerEJSFileContent, `./views/partials/header.ejs`)

   /**
    * generate views/partials/header.ejs
    */

    let footerEJSFileContent = `
<p class="text-center text-muted">&copy; Copyright 2022 Eruption</p>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>
`

    generateTextFile(footerEJSFileContent, `./views/partials/footer.ejs`)

   /**
    * generate views/pages/index.ejs
    */
    let indexEJSFileContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <%- include('../partials/head'); %>
</head>
<body class="container">

<header>
  <%- include('../partials/header'); %>
</header>

<main>
    <h1>Eruption Bot</h1>
    <div class="jumbotron">
        <h1 class="display-4">Hello, Iam the Eruption Bot!</h1>
        <p class="lead">I am a bot that helps you with Goshippo Shipping with your static website.</p>
        <p class="lead">For example, you could use me to integrate Snipcart and Goshippo, using my <code>"Snipcart GoShippo Adapter"</code>.</p>
        <hr class="my-4">
        <p>invite me in your Discord Server and i'll help you with Shipping Management!</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="<%= eruptionBotInviteLinkIntoAServer %>" role="button">Invite me in your Discord Server</a>
        </p>
    </div>
  <div class="jumbotron">
    <h1>This is great</h1>
    <p>Welcome to templating using EJS</p>
  </div>
</main>

<footer>
  <%- include('../partials/footer'); %>
</footer>

</body>
</html>
`

    generateTextFile(indexEJSFileContent, `./views/pages/index.ejs`)
  /**
   * Check created files :) 
   */
   console.info(` >> Eruption >> [pwd && ls -alh views/ && ls -alh views/partials] >> Check created folders and files :)  `)
   console.info(` >> Eruption >>  >> Check created folders and files :)  `)
   executeShellCmd(`pwd && ls -alh views/ && ls -alh views/partials`)
   executeShellCmd(`ls -alh views/pages`)
   executeShellCmd(`ls -alh ./views/partials/head.ejs`)
   executeShellCmd(`ls -alh ./views/partials/header.ejs`)
   executeShellCmd(`ls -alh ./views/partials/footer.ejs`)
   executeShellCmd(`ls -alh ./views/pages/index.ejs`)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   console.info(` >>> Eruption  on expressjs runkit - [prepareEJStemplates()] - >>>  END `)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   
}

