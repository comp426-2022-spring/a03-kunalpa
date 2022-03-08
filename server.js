import * as coins from './modules/coin.mjs'

// Require Express.js
const express = require('express')
const app = express()

const argv = require('minimist')(process.argv.slice(2))
argv['port']
const HTTP_PORT = argv.port || process.env.PORT || 5000

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

app.get('/app/flip/', (req, res) => {
    res.json({ flip: coinFlip() })
});

app.get('/app/flips/:number', (req, res) => {
    const number = req.params.number || 1

    const flips = new Array()
    for (var i = 0; i < number; i++) {
        flips.push(coinFlip())
    }
    res.json({raw: flips, summary:countFlips(flips)})
});

app.get('/app/flip/call/:call(heads|tails)', (req, res) => {
    res.status(200).json(coins.flipACoin(req.params.call))
})

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});