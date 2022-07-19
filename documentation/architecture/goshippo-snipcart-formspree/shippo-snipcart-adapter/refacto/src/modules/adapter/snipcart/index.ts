/**
 * Global Eruption Bot Configuration
 */
import {EruptionConfig,  eruptionConfiguration} from './../../../modules/config/'
import eruptionBotLogger from './../../../modules/logger'
import {CommonRoutesConfig} from '../../../common/common.routes.config';
import express from 'express';

export class SnipcartRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SnipcartRoutes');
    }

    configureRoutes(): express.Application {


        this.app.route(`/snipcart/shipping/rates`) // must be configured at https://app.snipcart.com/dashboard/carriers/webhooks
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`This endpoint is consumed by Snipcart to fetch shipping rates (I don't understand with its not a get... but well..)`);
        })
        .post((req: express.Request, res: express.Response) => {
          eruptionBotLogger.info(`Eruption Bot - [POST /snipcart/shipping/rates] - Request JSON payload is : `)
          eruptionBotLogger.info(JSON.stringify(req.body))
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
            
          res.json(shippingRatesJsonResponse);
          // res.status(200).send(`Post to users`);

        });

        return this.app;
    }

    configureFetchShippingratesRoute(): void {
      this.app.route(`/snipcart/shipping/rates`) // must be configured at https://app.snipcart.com/dashboard/carriers/webhooks
      .get((req: express.Request, res: express.Response) => {
          res.status(200).send(`This endpoint is consumed by Snipcart to fetch shipping rates (I don't understand with its not a get... but well..)`);
      })
      .post((req: express.Request, res: express.Response) => {
        eruptionBotLogger.info(`Eruption Bot - [POST /snipcart/shipping/rates] - Request JSON payload is : `)
        eruptionBotLogger.info(JSON.stringify(req.body))
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
          
        res.json(shippingRatesJsonResponse);
        // res.status(200).send(`Post to users`);

      });
      
    }
    configureOrderPaymentSuccessRoute(): void {


      this.app.route(`/snipcart/order/payment/success/webhook`) // must be configured at https://app.snipcart.com/dashboard/webhooks
      .get((req: express.Request, res: express.Response) => {
          res.status(200).send(`This endpoint is consumed by Snipcart's Webhook, which is triggered when the Snicpcart process completes, whether it is with success or failure of the payment, whatever proces error might happen.`);
      })
      .post((req: express.Request, res: express.Response) => {


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


      });

  }
  
}