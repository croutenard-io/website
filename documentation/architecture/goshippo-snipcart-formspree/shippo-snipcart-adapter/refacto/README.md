# The Snipcart Shippo Adapter Bot

for database management : 
* https://prisma.io orm
* migrations
* supports `mongo` `postgres` `cockroachDb`

## The idea (specs)

### High level Scenario 


* `Snipcart` will first query adapter using a webhook, to get shipment rates (and add the shipment costs to the bill)
* Adapter will, after payment is complete, trigger the `goshippo` shipment, and it should end by making a notification on a chatops like `discord` ("create shipment" endpoint)
* anyway, the adapter will : 
  * receive the snipcart webhook request to get shippo rates (and answer to the webhook) 
  * the snipcart payment process will then complete, on client browser side
  * When the payment is complete, Snipcart will send another Webhook, to the `Snipcart Shippo Adapter Bot`, and if the payment succeeded,  query goshippo api to create the shipment (to be confirmed, probably realted to using the _"Discord Gateway Intents"_)
  * send the discord message via a hubot discord chatbot 
  * all of actions must be persisted by the discord chatbot


_Persistence of all workflow executions history_

will be performed using mongoose, to a mongo db replicaset

## Run the Adapter

* Run the Adapter : 

```bash
# 
export WHERE_I_WORK_PATH=$(mktemp -d -t WHERE_I_WORK_PATH_XXXX)

echo "  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  "
echo "  >>>  WHERE_I_WORK_PATH=[${WHERE_I_WORK_PATH}]"
echo "  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  "
ls -alh ${WHERE_I_WORK_PATH}
echo "  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  "
echo "  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  >>>  "


export DESIRED_ADAPTER_VERSION=master
export DESIRED_ADAPTER_VERSION=develop
export DESIRED_ADAPTER_VERSION="feature/hugo-spin-up"

git clone git@github.com:croutenard-io/website.git ${WHERE_I_WORK_PATH}
cd ${WHERE_I_WORK_PATH}
git checkout ${DESIRED_ADAPTER_VERSION}

npm run preps

npm run dev

```


## Set up the Express JS TypeScript Project

* create the `package.json` : 

```bash 

# create package.json

npm init --yes

# install typescript dev dependencies 
npm i -D typescript @types/express @types/node  @types/cors @types/debug @types/express-winston source-map-support tslint concurrently nodemon


# generate the typescript config

npx tsc --init


# -- runtime dependencies

npm install --save dotenv express express-winston winston debug cors
npm i --save shelljs @types/shelljs
npm i --save ejs @types/ejs
npm i --save express-validator @types/express-validator
npm uninstall @types/express-validator && npm uninstall --save @types/express-validator
npm i -D @types/express-validator


npm uninstall @types/ejs @types/express-validator @types/shelljs && npm uninstall --save @types/ejs @types/express-validator @types/shelljs

npm i -D @types/ejs @types/express-validator @types/shelljs


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

npm i --save discord.js @discordjs/builders @discordjs/rest discord-api-types
npm i -D @types/discord.js @types/discord-api-types



mkdir -p ./src/common/
mkdir -p ./src/users/

touch ./src/index.ts
touch ./src/common/common.routes.config.ts
touch ./src/users/users.routes.config.ts
```


## Tests

* Send the POST Http Request just as if i was Snipcart sending the WebHook Http Post Request with JSON payload, to fetch shipping rates : 


```bash

export POKUS_JSON_PAYLOAD="
{
  \"eventName\": \"shippingrates.fetch\",
  \"mode\": \"Live\",
  \"createdOn\": \"2015-02-21T14:58:02.6738454Z\",
  \"content\": {
    \"token\": \"22808196-0eff-4a6e-b136-3e4d628b3cf5\",
    \"creationDate\": \"2015-02-21T14:58:02.6738454Z\",
    \"modificationDate\": \"2015-02-21T14:58:02.6738454Z\",
    \"status\": \"Processed\",
    \"currency\": \"USD\",
    \"lang\": \"en\",
    \"paymentMethod\": \"CreditCard\",
    \"email\": \"customer@snipcart.com\",
    \"cardHolderName\": \"Nicolas Cage\",
    \"billingAddressName\": \"Nicolas Cage\",
    \"billingAddressCompanyName\": \"Company name\",
    \"billingAddressAddress1\": \"888 The street\",
    \"billingAddressAddress2\": \"\",
    \"billingAddressCity\": \"QuÃ©bec\",
    \"billingAddressCountry\": \"CA\",
    \"billingAddressProvince\": \"QC\",
    \"billingAddressPostalCode\": \"G1G 1G1\",
    \"billingAddressPhone\": \"(888) 888-8888\",
    \"shippingAddressName\": \"Nicolas Cage\",
    \"shippingAddressCompanyName\": \"Company name\",
    \"shippingAddressAddress1\": \"888 The street\",
    \"shippingAddressAddress2\": \"\",
    \"shippingAddressCity\": \"QuÃ©bec\",
    \"shippingAddressCountry\": \"CA\",
    \"shippingAddressProvince\": \"QC\",
    \"shippingAddressPostalCode\": \"G1G 1G1\",
    \"shippingAddressPhone\": \"(888) 888-8888\",
    \"shippingAddressSameAsBilling\": true,
    \"finalGrandTotal\": \"310.00\",
    \"shippingAddressComplete\": true,
    \"creditCardLast4Digits\": \"4242\",
    \"shippingFees\": \"10.00\",
    \"shippingMethod\": \"Livraison\",
    \"items\": [{
      \"uniqueId\": \"eb4c9dae-e725-4dad-b7ae-a5e48097c831\",
      \"token\": \"22808196-0eff-4a6e-b136-3e4d628b3cf5\",
      \"id\": \"1\",
      \"name\": \"Movie\",
      \"price\": \"300.00\",
      \"originalPrice\": \"300.00\",
      \"quantity\": \"1\",
      \"url\": \"https://snipcart.com\",
      \"weight\": \"10.00\",
      \"description\": \"Something\",
      \"image\": \"http://placecage.com/50/50\",
      \"customFieldsJson\": \"[]\",
      \"stackable\": true,
      \"maxQuantity\": null,
      \"totalPrice\": \"300.0000\",
      \"totalWeight\": \"10.00\",
      \"shippable\": true
    }],
    \"subtotal\": \"610.0000\",
    \"totalWeight\": \"20.00\",
    \"discounts\": [],
    \"willBePaidLater\": false
  }
}
"

# export ERUPTION_BASE_URL="https://untitled-iih05peptjeb.runkit.sh"
export ERUPTION_BASE_URL="https://eruptionbot.herokuapp.com"
export ERUPTION_BASE_URL="http://127.0.0.1:5656"

echo "ERUPTION_BASE_URL=[${ERUPTION_BASE_URL}]"
echo "${POKUS_JSON_PAYLOAD}" | jq .

curl -iv \
     -X POST "${ERUPTION_BASE_URL}/snipcart/shipping/rates" \
     -H 'Content-Type: application/json' \
     -d "${POKUS_JSON_PAYLOAD}" | tail -n 1 | jq .

```


* Here is the JSon Payload sent by the snipcart Webhook, when `order.completed` event occurs : 

```bash 
{"eventName":"customauth:customer_updated","mode":"Test","createdOn":"2022-07-14T15:22:55.9845125Z","content":{"id":"3bd0d38e-3748-4b73-8bc3-162bbdb9e7af","email":"croutontechlead@gmail.com","mode":"Test","statistics":{"ordersCount":0,"ordersAmount":null,"subscriptionsCount":0},"creationDate":"2022-07-13T16:03:21.347Z","billingAddressFirstName":null,"billingAddressName":"CroutonTechLead","billingAddressCompanyName":null,"billingAddressAddress1":"8 Impasse du Martin Pêcheur","billingAddressAddress2":"","billingAddressCity":"Agde","billingAddressCountry":"FR","billingAddressProvince":"Occitanie","billingAddressPostalCode":"34300","billingAddressPhone":"","shippingAddressFirstName":null,"shippingAddressName":"Paul Bismuth","shippingAddressCompanyName":null,"shippingAddressAddress1":"5 Rue Achille Martinet","shippingAddressAddress2":"","shippingAddressCity":"Paris","shippingAddressCountry":"FR","shippingAddressProvince":"IDF","shippingAddressPostalCode":"75018","shippingAddressPhone":"","shippingAddressSameAsBilling":false,"status":"Unconfirmed","sessionToken":"7facc5ba-f0a8-4e92-88ab-47bbc2e86e11","gravatarUrl":"https://www.gravatar.com/avatar/5015e40bf1b74ca2913bb5735cb659ad?s=70&d=https%3a%2f%2fcdn.snipcart.com%2fassets%2fimages%2favatar.jpg","billingAddress":{"fullName":"CroutonTechLead","firstName":null,"name":"CroutonTechLead","company":null,"address1":"8 Impasse du Martin Pêcheur","address2":"","fullAddress":"8 Impasse du Martin Pêcheur","city":"Agde","country":"FR","postalCode":"34300","province":"Occitanie","phone":"","vatNumber":null,"hasMinimalRequiredInfo":true,"validationErrors":{}},"shippingAddress":{"fullName":"Paul Bismuth","firstName":null,"name":"Paul Bismuth","company":null,"address1":"5 Rue Achille Martinet","address2":"","fullAddress":"5 Rue Achille Martinet","city":"Paris","country":"FR","postalCode":"75018","province":"IDF","phone":"","vatNumber":null,"hasMinimalRequiredInfo":true,"validationErrors":{}}}}
```

## Snipcart Dashboard configuration

You go to the Shipping menu, you activate webhook option, and click the "Configure" button for the webhook option, then you give the webhook URL, (must be configured at https://app.snipcart.com/dashboard/carriers/webhooks), here i gave the runkit Endpint URL, which is https://eruption.kerokuapp.com/snipcart/shipping/rates : 


![snipcart fetching runkit endpoint](./documentation/images/snipcart/configure-fetch-shipping-rates.PNG)



Annnddd, Finally, here is what i get on my website !!! : 

![snipcart fetching runkit endpoint](./documentation/images/snipcart/first-integration-result-via-runkit.1.PNG)

<!-- /C/Users/Utilisateur/crouton/documentation/architecture/goshippo-snipcart-formspree\shippo-snipcart-adapter\first-integration-result-via-runkit.1.PNG -->

And here below the endpoint displays you all order details when `order.completed` snipcart event occurs :


![snipcart fetching runkit endpoint](./documentation/images/snipcart/first-integration-result-via-runkit.5.order.completed.event.catched.PNG)


## MongoDB persistence with Mongoose

This tutorial is perfect : https://www.freecodecamp.org/news/build-a-100-days-of-code-discord-bot-with-typescript-mongodb-and-discord-js-13/

* It's typescript
* its v13 of Discord JS (the latest version)
* It shows how to work with `Intents` in `TypeScript` without a `require`, but with `import` Keyword instead.
* theres more to learn about intents on diiscordjs v13 : 
  * https://stackoverflow.com/questions/68791091/about-discord-js-v13-start-all-intents  
  * there's something to learn about `IntentBitField`, and what are `BitField`.
* it uses mongodb for persistence ( i will need to persist the state tof each Stateful Discord Object, eg we shall not register slash commands while they are already registered)


## References

tutorials about setting up a typescript Express JS Project : 

* https://blog.logrocket.com/how-to-set-up-node-typescript-express/
* http://expressjs.com/en/starter/examples.html#additional-examples

About ExpressJS patterns : 

* http://expressjs.com/en/guide/routing.html (especially the `Router()` )
* https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
* https://kimsereylam.com/typescript/2021/12/03/winston-logger-with-typescript.html

Bot : 

* An example effrot to accelerate discord bot dev : https://purplet.js.org/docs/getting-started
* wouala : https://github.com/RasaHQ/rasa

* I want **Cloudflare AND Heroku** deployments on free tier, and testing Webhooks with NGROK-like HTTP Tunnel : 
  * https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers#setting-up-ngrok
  * I don't want to use ngrok, instead i want to use : 
    * https://github.com/fatedier/frp together with prometheus for monitoring inspection during tests
    * I am really not sure if i can find a production ready UDP / TCP tunnel, that is really open source ... made of / with a revere proxy and its cleint....
    * https://github.com/anderspitman/awesome-tunneling#open-source-at-least-with-a-reasonably-permissive-license
  * I want pipeline smade with Circle CI AND Tekton.dev AND Drone ( I will do them in that order, tekton before drone)
  * then im back on terraform Packer ICMP Scan for VirtualBox : 
    * will be used to terraform the whole
    * i will use pokusbox virtual box terraform provider, and ansible to terraform Drone and Tekton CICD with Ngrok

* Snowflakes : https://discord.com/developers/docs/reference#snowflakes
* important upgrade to proceed with : https://discord.com/developers/docs/tutorials/upgrading-to-application-commands
* terminology : https://sellercentral.amazon.com/gp/help/external/G34151?language=en_US