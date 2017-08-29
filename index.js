'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mtg = require('mtgsdk')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function (request, response) {
    const params = request.body.result.parameters;
    console.log(params);
    if(params.cardNumber) {
        mtg.card.find(params.cardNumber).then((result) => {
            console.log(result);
            let color = '';
            if(result.card.colors && result.card.colors.length > 0) {
                let color = `It's a ${result.card.colors[0]} card.`;
            } 

            response.send({
                "speech": `Is it ${result.card.name}? ${color} ${result.card.imageUrl}`
            });
        });
    } else {
        mtg.card.where({
            name: params.cardName || 'black lotus',
            pageSize: 1
        }).then(result => {
            let color = '';
            if(result[0].colors && result[0].colors.length > 0) {
                let color = `It's a ${result[0].colors[0]} card.`;
            } 

            response.send({
                "speech": `Is it ${result[0].name}? ${color} ${result[0].imageUrl}`
            });
        });
    }
});

app.listen(3000);

console.log('Open: http://127.0.0.1:3000');