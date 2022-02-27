import * as coins from './modules/coin.mjs'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

app.get('/app/', (req, res) => {
    // Responds with status 200
    res.statusCode = 200
    // Responds with status message "OK"
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, {
        'Content-Type' : 'text/plain'
    });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip', (req, res) => {
    res.status(200).json({ flip: coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips);
    res.status(200).json({ raw: flips, summary: count })
});

app.get('/app/flip/call/:call(heads|tails)', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});