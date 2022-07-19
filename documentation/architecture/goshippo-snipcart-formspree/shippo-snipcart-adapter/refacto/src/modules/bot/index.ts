const { Client, Intents, TextChannel } = require('discord.js');
const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
let shippingMgmtChannel : (typeof TextChannel) = null;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


export class EruptionBot {
    constructor(name: string) {

    }
}