//// REQUIRES NODE v18.5.0 +

/**
 * Global Eruption Bot Configuration
 */
import {EruptionConfig,  eruptionConfiguration} from './modules/config/'
import eruptionBotLogger from './modules/logger'
import express from 'express';
import ejs from "ejs";
import * as http from 'http';


import cors from 'cors';

import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import {SnipcartRoutes} from './modules/adapter/snipcart/'; // webhook for order payment success

import debug from 'debug';



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


const { Client, Intents } = require('discord.js');
const discordClient2 = new Client({ intents: [Intents.FLAGS.GUILDS] });
let shippingMgmtChannel = null;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

import { query, validationResult } from "express-validator";
import bodyParser from 'body-parser';





/**
 * --------------------------------
 */


/**
 * https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
 * https://blog.logrocket.com/how-to-set-up-node-typescript-express/
 * 
 */
const app: express.Application = express();
const server: http.Server = http.createServer(app);
// const port = 3000;
const bot_port: number = parseInt(`${process.env.ERUPTIONBOT_PORT}`) || 5656;
const bot_host: string = process.env.ERUPTIONBOT_HOST || "127.0.0.1";
// const http_proto = process.env.ERUPTIONBOT_HTTP_PROTO || "https";
const bot_http_proto = process.env.ERUPTIONBOT_HTTP_PROTO || "http";
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('index');
















/***************************************************************************
 *     App Express setup add on
 * -------------------------------------------------------------------------
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());
// parse application/json
app.use(bodyParser.json())
// // parse application/vnd.api+json as json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/json as json
app.use(bodyParser.json({ type: 'application/json' }));

// here we are adding middleware to allow cross-origin requests
app.use(cors());
// initialize the logger with the above configuration
// app.use(eruptionBotLogger);


/**
 * EJS page templates for views
 **/
 app.set('view engine', 'ejs');














/****************************************************************
 *           ROUTES
 * --------------------------------------------------------------
 * 
 */
// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app));
routes.push(new SnipcartRoutes(app));

// this is a simple route to make sure everything is working properly
const runningMessage = `⚡️[Eruption Bot!]: Service is running at ${bot_http_proto}://${bot_host}:${bot_port}`;
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage)
});



app.listen(bot_port, bot_host, () => {
  eruptionBotLogger.info(runningMessage);
});

/*

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const bot_port: number = parseInt(`${process.env.ERUPTIONBOT_PORT}`) || 5656;
const bot_host: string = process.env.ERUPTIONBOT_HOST || "127.0.0.1";
// const http_proto = process.env.ERUPTIONBOT_HTTP_PROTO || "https";
const bot_http_proto = process.env.ERUPTIONBOT_HTTP_PROTO || "http";



app.get('/', (req: Request, res: Response) => {
  res.send('Eruption Bot!');
});

// bot_port
// bot_host
// bot_http_proto
app.listen(bot_port, bot_host, () => {
  console.log(`⚡️[server]: Server is running at ${bot_http_proto}://${bot_host}:${bot_port}`);
});

*/
