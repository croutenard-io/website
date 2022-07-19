
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

export interface EruptionConfig {
    discordServerIDalsoGuildID: string;
    shippingMgmtChannelID: string;
    discordBotUserUniqueName: string;
    discordBotToken: string;
    discordBotClientID: string;
    discordBotPermissionInteger: string;
    botInviteLinkIntoAServer: string;
}


export const eruptionConfiguration: EruptionConfig = {
    discordServerIDalsoGuildID: `${eruptionDiscordServerIDalsoGuildID}`,
    shippingMgmtChannelID: `${edruptionShippingMgmtChannelID}`,
    discordBotUserUniqueName: `${eruptionDiscordBotUserUniqueName}`,
    discordBotToken: `${eruptionDiscordBotToken}`,
    discordBotClientID: `${eruptionDiscordBotClientID}`,
    discordBotPermissionInteger: `${eruptionDiscordBotPermissionInteger}`,
    botInviteLinkIntoAServer: `${eruptionBotInviteLinkIntoAServer}`
};