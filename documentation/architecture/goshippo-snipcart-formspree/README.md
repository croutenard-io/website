# High Level Architecture 


<!-- Schematiscs go here -->


# Integration: the idea

https://formspree.io 's documentation proposes to use its webhooks by running an enpoint on https://runkit.io : 

https://help.formspree.io/hc/en-us/articles/360015234873-Webhooks


I can use this to integrate via webhooks Snipcart and Goshippo

https://docs.snipcart.com/v3/setup/shipping#webhooks shows that the snipcart process can be integrated with Goshippo using a webhooks : 

* snipcart sends a webhooks HTTP POST rerquest, and expects a `2XX` HTTP response code as a success, containing a JSON payload ( `HTTP` Method `POST` `Content-Type application/json` ) :

```JSon
{
  "eventName": "shippingrates.fetch",
  "mode": "Live",
  "createdOn": "2015-02-21T14:58:02.6738454Z",
  "content": {
    "token": "22808196-0eff-4a6e-b136-3e4d628b3cf5",
    "creationDate": "2015-02-21T14:58:02.6738454Z",
    "modificationDate": "2015-02-21T14:58:02.6738454Z",
    "status": "Processed",
    "currency": "USD",
    "lang": "en",
    "paymentMethod": "CreditCard",
    "email": "customer@snipcart.com",
    "cardHolderName": "Nicolas Cage",
    "billingAddressName": "Nicolas Cage",
    "billingAddressCompanyName": "Company name",
    "billingAddressAddress1": "888 The street",
    "billingAddressAddress2": "",
    "billingAddressCity": "QuÃ©bec",
    "billingAddressCountry": "CA",
    "billingAddressProvince": "QC",
    "billingAddressPostalCode": "G1G 1G1",
    "billingAddressPhone": "(888) 888-8888",
    "shippingAddressName": "Nicolas Cage",
    "shippingAddressCompanyName": "Company name",
    "shippingAddressAddress1": "888 The street",
    "shippingAddressAddress2": "",
    "shippingAddressCity": "QuÃ©bec",
    "shippingAddressCountry": "CA",
    "shippingAddressProvince": "QC",
    "shippingAddressPostalCode": "G1G 1G1",
    "shippingAddressPhone": "(888) 888-8888",
    "shippingAddressSameAsBilling": true,
    "finalGrandTotal": 310.00,
    "shippingAddressComplete": true,
    "creditCardLast4Digits": "4242",
    "shippingFees": 10.00,
    "shippingMethod": "Livraison",
    "items": [{
      "uniqueId": "eb4c9dae-e725-4dad-b7ae-a5e48097c831",
      "token": "22808196-0eff-4a6e-b136-3e4d628b3cf5",
      "id": "1",
      "name": "Movie",
      "price": 300.00,
      "originalPrice": 300.00,
      "quantity": 1,
      "url": "https://snipcart.com",
      "weight": 10.00,
      "description": "Something",
      "image": "http://placecage.com/50/50",
      "customFieldsJson": "[]",
      "stackable": true,
      "maxQuantity": null,
      "totalPrice": 300.0000,
      "totalWeight": 10.00,
      "shippable": true,
    }],
    "subtotal": 610.0000,
    "totalWeight": 20.00,
    "discounts": [],
    "willBePaidLater": false
  }
}
``` 
* the reponse must provide snipcart with the shipping rates to propose to snipcart (snipcart requires one HTTP response Header, namely `Content-Type:	application/json`) : 

```JSon
{
  "rates": [{
    "cost": 10,
    "description": "10$ shipping"
    }, {
    "cost": 20,
    "description": "20$ shipping",
    "guaranteedDaysToDelivery": 5
    },
    ...
  ]
}
```



<!--
I also still need hugo goshipo integration : 
* 

-->