const express = require('express');
const router = new express.Router();
var querystring = require('querystring');
var https = require("https");


router.get('/', async (req, res, next) => {
    res.render('../views/picpay.hbs');
});

router.post('/picpay', async (req, res, next) => {
    var pay = JSON.stringify({
        "x-picpay-token" : "5b008cef7f321d00ef2367b2",
        "referenceId": "102030",
        "callbackUrl": "http://www.sualoja.com.br/callback",
        "returnUrl": "http://www.sualoja.com.br/cliente/pedido/102030",
        "value": "20.51",
        "expiresAt": "2022-05-01T16:00:00-03:00",
        "buyer": {
            "firstName": "João",
            "lastName": "Da Silva",
            "document": "123.456.789-10",
            "email": "test@picpay.com",
            "phone": "+55 27 12345-6789"
        }
    });
    
    var options = {
        url: 'https://appws.picpay.com/ecommerce/public/',
        PORT: '80',
        method: 'POST'
    };
    
    var httpsReq = https.request(options, function(req, res) {
        console.log('STATUS', res.statusCode);
        res.setEncoding('utf8');
    
        res.on('data', function(chunk) {
            console.log('BODY:', chunk);
        });
    
        res.on('end', function() {
            console.log('No more data in response');
        });
    });
    
    httpsReq.on('error', function(e) {
        console.log('Error with the request:', e.message);
    });
    
    httpsReq.write(pay);
    httpsReq.end();
});


module.exports = router;