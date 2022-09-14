const { Client, Intents, TextChannel } = require('discord.js');
const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
let shippingMgmtChannel : (typeof TextChannel) = null;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


export class EruptionBot {
    discordClient:typeof Client; // any is the type, its just in case type changes in future versions of DiscordJS
    
    constructor() {
        super();
        this.myIntents = new IntentsBitField();
        this.myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds);
        this.discordClient = new Client({ intents: this.myIntents });   
    }

    sendMessageToDiscordChannel(message: string): void {
        // const sendMessageToDiscordChannel = (message) => {
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
         this.discordClient.channels.cache.get(`${eruptionConfiguration.shippingMgmtChannelID}`).send(` [ >EruptionBot< - >> ] Salut c\'est le Robot Eruption !! >> ${message}`)
        }
}