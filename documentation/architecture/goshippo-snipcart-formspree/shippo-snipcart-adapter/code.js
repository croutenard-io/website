//// REQUIRES NODE v18.5.0 +

var express = require("@runkit/runkit/express-endpoint/1.0.0");
const shell = require("shelljs");
const ejs = require("ejs");

// const discordClient = require("discord.js");
const { Client, Intents } = require('discord.js');
const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const { query, validationResult } = require("express-validator");
const cors = require("cors");
const request = require("request");
var bodyParser = require('body-parser');

const app = express(exports);
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); /// this one is fine
// app.use(express.bodyParser()); /// this one throws a Runkit Endpoint Init Exception
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
// // parse application/vnd.api+json as json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/json as json
app.use(bodyParser.json({ type: 'application/json' }));
// app.use(cors());


/**
 * EJS page templates for views
 **/
 app.set('view engine', 'ejs');






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


// const guildID = `https://discord.com/api/guilds/976956636407136296/widget.json`
// const eruptionGuildID = `976956636407136296`
const eruptionDiscordServerIDalsoGuildID = `976956636407136296`
const edruptionShippingMgmtChannelID = `977021632696692788`

const eruptionDiscordBotUserUniqueName = `eruption__app_bot#2352`
const eruptionDiscordBotToken = `${process.env.ERUPTION_DISCORD_BOT_TOKEN}`
const eruptionDiscordBotClientID = `${process.env.ERUPTION_DISCORD_BOT_CLIENTID}`
// const eruptionDiscordBotPermissionInteger = `397284858944`

/**
 * 535326874947    contgains permissions to manage webhooks
 * to (re-)generate a Discord Bot Permission Integer, go at https://discord.com/developers/applications
 */
const eruptionDiscordBotPermissionInteger = `535326874947`
const eruptionBotInviteLinkIntoAServer = `https://discord.com/api/oauth2/authorize?client_id=${eruptionDiscordBotClientID}&permissions=${eruptionDiscordBotPermissionInteger}&scope=bot%20applications.commands
`



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
    ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(eruptionDiscordBotToken);


    /// 
    rest.put(Routes.applicationGuildCommands(eruptionDiscordBotClientID, eruptionDiscordServerIDalsoGuildID), { body: commands })
        .then(() => console.log(' [ >EruptionBot< - >> ] Successfully registered application commands.'))
        .catch(console.error);



}



const initDiscordApp = (botId, command) => {
    /**
     * - 
     **/
    console.info(`Invite the Eruption Disocrd Bot in your discord server, by clicking the following link :  ${eruptionBotInviteLinkIntoAServer}  `)
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
    });

    discordClient2.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }

        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
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
    channel.createWebhook('jeanbaptiste#9951', {
        avatar: 'https://i.imgur.com/AfFp7pu.png',
    })
        .then(webhook => console.log(`Created webhook ${webhook}`))
        .catch(console.error);
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
    discordClient2.channels.cache.get(`${edruptionShippingMgmtChannelID}`).send(` [ >EruptionBot< - >> ] Salut c\'est le Robot Eruption !! >> ${message}`)
}



/**
 * --- + --- +
 * First, let's init discord bot at Runkit startup
 * --- + --- +
 **/

/// [initDiscordApp()]  execution is long, and it just registers the bot commands, after login in as bot  : so i just comment that for now
// initDiscordApp()


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
 * curl https://ccc/test
 * 
 **/
 app.get("/test", (req, res) => {
    console.info(`Eruption on expressjs runkit - [GET /test] - Request query is : `)
    
    let cmdToexecute = `
    cat <<EOF> ./config.toml
    version: '3'
    services:
      my_webapp:
        image: eruption/snipcart-shippo-adapter
        build: ./oci/endpoint/
        dockerfile: ./.eruption.Dockerfile
        environment:
          RUNKIT_HOST: "https://runkit.com/crtntechlead/23DFVsqdefsdf"
          ERUPTION_SHIPMENT_API_HOST: "https://api.shippo.com/"
    EOF
    `;
    
    let textFileContent = `
    version: '3'
    services:
      my_webapp:
        image: eruption/snipcart-shippo-adapter
        build: ./oci/endpoint/
        dockerfile: ./.eruption.Dockerfile
        environment:
          RUNKIT_HOST: "https://runkit.com/crtntechlead/23DFVsqdefsdf"
          ERUPTION_SHIPMENT_API_HOST: "https://api.shippo.com/"
    `;

    // console.info(JSON.stringify(req.query))
    // var pokusName = req.query.name || "pokusName par défault";
    // var pokusNickName = req.query.nick;


    console.info(` >>> Eruption on expressjs runkit - [GET /test] - >>> cmdToexecute  is :  `)
    console.info(cmdToexecute)
    console.info(` >>> Eruption on expressjs runkit - [GET /test] - >>> textFileContent  is :  `)
    console.info(textFileContent)
    
    console.info(` >>> Eruption on expressjs runkit - [GET /test] - >>> Now executing test :  [generateTextFile(textFileContent)]  `)
    
    generateTextFile(textFileContent, `./docker-compose.yml`)

    console.info(` >> Eruption >> [pwd && ls -alh ./ && ls -alh ./docker-compose.yml] >> Check created folders and files :)  `)
    console.info(` >> Eruption >>  >> Check created folders and files :)  `)
   
    // pwd && ls -alh ./ && ls -alh ./docker-compose.yml
    executeShellCmd('pwd && ls -alh ./ && ls -alh ./docker-compose.yml')
    console.info(` >>> - ---------------------------------------------------------------- - >>>`)
    console.info(` >>> Eruption  on expressjs runkit - [prepareEJStemplates()] - >>>  END `)
    console.info(` >>> - ---------------------------------------------------------------- - >>>`)
    
    
    res.status(201) // that's if test result is successfull

    res.send(` >>> Eruption  on expressjs runkit - [GET /test] - >>> cmdToexecute is now :  <br> <pre>${cmdToexecute}</pre>`)
})
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
   executeShellCmd(`mkdir -p views/partials`)
   
   /**
    * generate views/partials/head.ejs
    */
   let headEJSFileContent = `
   <meta charset="UTF-8">
   <title>EJS Is Fun</title>

   <!-- CSS (load bootstrap from a CDN) -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css">
   <style>
   body { padding-top:50px; }
   </style>
   `
   generateTextFile(textFileContent, `./views/partials/head.ejs`)

  /**
   * Check created files :) 
   */
   console.info(` >> Eruption >> [pwd && ls -alh views/ && ls -alh views/partials] >> Check created folders and files :)  `)
   console.info(` >> Eruption >>  >> Check created folders and files :)  `)
  
   executeShellCmd(`pwd && ls -alh views/ && ls -alh views/partials`)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   console.info(` >>> Eruption  on expressjs runkit - [prepareEJStemplates()] - >>>  END `)
   console.info(` >>> - ---------------------------------------------------------------- - >>>`)
   
}
/**
 * -------------  BOT'S LANDING PAGE EXPRESS ROUTER
 */
// app.get("/", (req, res) => res.send(`hey ${req.query.name}`))


// index page
/* 
app.get("/", function(req, res) {

    var mascots = [
      { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
      { name: 'Tux', organization: "Linux", birth_year: 1996},
      { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";
  
    res.render('pages/index', {
      mascots: mascots,
      tagline: tagline
    });
  });

 */



















/*
app.get("/", (req, res) => {
    console.info(`[Endpoiçnt | /] - pokus on expressjs runkit!!!`)
    res.send(`[Endpoiçnt | /] - pokus on expressjs runkit!!!`)
})
**/
/**
 * curl https://ccc/hello?nick=goku&name=wifey
 * app.get("/:name", (req, res) => res.send(`hey ${req.params.name}`))
 **/
app.get("/essai", (req, res) => {
    console.info(`pokus on expressjs runkit - [GET /essai] - Request query is : `)
    console.info(JSON.stringify(req.query))
    // checkExpressVersion()
    res.status(201)
    var pokusName = req.query.name || "pokusName par défault";
    var pokusNickName = req.query.nick;
    res.send(`Essai - Hello ${pokusName} Pokus! :) Your NickName is [${pokusNickName}] on expressjs runkit - [GET /essai]`)
})

/**
 * curl https://ccc/bonjour
 **/
app.get("/bonjour", (req, res) => {
    console.info(`pokus on expressjs runkit - [GET /bonjour]`)
    // checkExpressVersion()
    res.status('201')
    res.send(`Bonjour Pokus! :) on expressjs runkit - [GET /bonjour]`)
})

/**
 * see in section "Tests" below, an example test curl to test that endpoint
 * this endpoint is consumed by the Snipcart Webhook to fetch shipping Rates
 **/
app.post("/shipping/rates", (req, res) => {
    console.info(`pokus on expressjs runkit - [GET /shipping/rates] - Request JSON payload is : `)
    console.info(JSON.stringify(req.body))
    // checkExpressVersion()
    res.status(201)
    var pokusCardHolderName = req.body.content.cardHolderName || "[shippingAddressName par défault]";
    var pokusShippingAddressName = req.body.content.shippingAddressName || "[shippingAddressName par défault]";
    let pokusJSONResponse = {
        message: `Shipping Rates - Hello Pokus! :) Your pokusCardHolderName is [${pokusCardHolderName}] on expressjs runkit - [GET /shipping/rates]`,
        pokusCardHolderName: `${pokusCardHolderName}`,
        pokusShippingAddressName: `${pokusShippingAddressName}`
    }
    let shippingRatesJsonResponse = {
        rates: [{
            cost: 10,
            description: "10$ Crouton shipping"
            }, {
            cost: 20,
            description: "20$ Crouton shipping",
            guaranteedDaysToDelivery: 5
            }
        ]
    }
    //res.json(pokusJSONResponse);
    res.json(shippingRatesJsonResponse);
    // res.send(`Essai Pokus! :) on expressjs runkit - [GET /essai]`)
    // res.send(`hey ${pokusName} , your nickanme is ${pokusNickName}`)
})


/**
 * The snipcart events are broadcasted by snipcart via webhooks : 
 *   thats how i will be notified that order is completed 
 *   so the shipment can be created in the carrier, by the
 *   multi-carrier service provider (ShipStation, GoShippo, etc...).
 * 
 * My Runkit Notebook : https://runkit.com/ctrtechlead/62cf1a47ebc2880009354ee7
 * 
 * ---
 * the [eventName] : gives us the name of the snipcart event. 
 *                   When this event name is 'order.completed' (snipcart api 'v3.x') : 
 *                   the order has been compelted, so the 
 *                   goShippo shipment can be created.
 * 
 * ---
 * the [order.completed] payload : gives us the detailed infos about the 
 *                                 completed order (what shipping parcels have to
 *                                 be prepared, etc...) 
 * 
 * --
 * Note : when human operator has delivered the prepared parcel
 *        to thge carrier, then a new custom notification may be
 *        sent to either (customer and/or seller), see https://docs.snipcart.com/v3/api-reference/notifications#post-orderstokennotifications
 * 
 * -- 
 * 
 * References : 
 * - https://docs.snipcart.com/v3/webhooks/order-events
 * - https://docs.snipcart.com/v3/sdk/events (that's for client side subscription to snipcart events during payment process)
 * - https://docs.snipcart.com/v3/api-reference/notifications#post-orderstokennotifications
 **/

app.post("/shipping/snipcart/webhook", (req, res) => {
    console.info(`pokus on expressjs runkit - [GET /shipping/snipcart/webhook] - Request JSON payload is : `)
    console.info(JSON.stringify(req.body))
    let snipcartEventName = req.body.eventName;
    let snipCartPayload = req.body;

    // foreach product line in ourchase  : 
    let purchaseProductNumber = null;
    let snipcartProductName = null;
    let snipcartProductPrice = null;
    let snipcartProductQty = null;
    let snipcartProductID = null;



    if (snipcartEventName == 'order.completed') {
        console.info(`[POST /shipping/snipcart/webhook] - Order is NOW COMPLETED! Snipcart EVENT is [ snipcartEventName = [${snipcartEventName}] ] `)
        // Okay so now that i know that order is completed, i just
        console.info(` SNIPCART EVENTS WEBHOOK >>>>> Okay so now that i know that order is completed, i just`)
        // take all cart informations to creat the shipping on Goshippo 
        console.info(` SNIPCART EVENTS WEBHOOK >>>>> take all cart informations to create the shipping on Goshippo `)

        let invoiceNumber = snipCartPayload.content.invoiceNumber;
        let shippingAddressName = snipCartPayload.content.shippingAddressName;
        let billingAddressName = snipCartPayload.content.billingAddressName;

        console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> invoiceNumber=[${invoiceNumber}] `)
        console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> shippingAddressName=[${shippingAddressName}] `)
        console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> billingAddressName=[${billingAddressName}] `)


        let purchaseProductNumber = snipCartPayload.content.items.length;
        for (i = 0; i < purchaseProductNumber; i++) {

            snipcartProductName = snipCartPayload.content.items[i].name;
            snipcartProductPrice = snipCartPayload.content.items[i].price;
            snipcartProductQty = snipCartPayload.content.items[i].quantity;
            snipcartProductID = snipCartPayload.content.items[i].id;
            console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductName=[${snipcartProductName}] `)
            console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductPrice=[${snipcartProductPrice}] `)
            console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductQty=[${snipcartProductQty}] `)
            console.info(` SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductID=[${snipcartProductID}] `)


            // --- 

            

            sendMessageToDiscordChannel(` ERUPTIUON DISCORD BOT ] -x- SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductName=[${snipcartProductName}] `)
            sendMessageToDiscordChannel(` ERUPTIUON DISCORD BOT ] -x- SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductPrice=[${snipcartProductPrice}] `)
            sendMessageToDiscordChannel(` ERUPTIUON DISCORD BOT ] -x- SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductQty=[${snipcartProductQty}] `)
            sendMessageToDiscordChannel(` ERUPTIUON DISCORD BOT ] -x- SNIPCART EVENTS WEBHOOK >>>>> ORDER COMPLETED >>> snipcartProductID=[${snipcartProductID}] `)

        }

        

    } else {
        console.info(`[POST /shipping/snipcart/webhook] - Order is not completed! Snipcart EVENT is [ snipcartEventName = [${snipcartEventName}] ] `)
    }
    // checkExpressVersion()
    res.status(201)
    // var pokusCardHolderName = req.body.content.cardHolderName || "[shippingAddressName par défault]";
    // var pokusShippingAddressName = req.body.content.shippingAddressName || "[shippingAddressName par défault]";
    let pokusJSONResponse = {
        message: `Shipping /shipping/snipcart/webhook `,
        http_snipcart_body: req.body,
        snipcart_event: `${snipcartEventName || 'whatever pokusSnipcartEvent '}`,
        pokusSnipcartEventData: `${snipCartPayload || 'whatever pokusSnipcartEventData '}`
    }
    //res.json(pokusJSONResponse);
    res.json(pokusJSONResponse);
    // res.send(`Essai Pokus! :) on expressjs runkit - [GET /essai]`)
    // res.send(`hey ${pokusName} , your nickanme is ${pokusNickName}`)
})
