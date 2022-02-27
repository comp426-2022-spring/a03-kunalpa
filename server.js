import * as coins from './modules/coin.mjs'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Require Express.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});
app.get('/app/', (req, res) => {
    // Responds with status 200
    res.statusCode = 200;
    // Responds with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {
        'Content-Type' : 'text/plain'
    });
    res.end(res.statusCode + ' ' + res.statusMessage);
});

app.get('/app/flip', (req, res) => {
    res.status(200).json({ flip: coins.coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coins.coinFlips(req.params.number);
    const count = coins.countFlips(flips);
    res.status(200).json({ raw: flips, summary: count })
});

app.get('/app/flip/call/:call(heads|tails)', (req, res) => {
    res.status(200).json(coins.flipACoin(req.params.call))
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});