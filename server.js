import { coinFlip, coinFlips, countFlips, flipACoin } from './modules/coin.mjs';
import { createRequire } from 'module';

// Require Express.js
const require = createRequire(import.meta.url)
const express = require('express') 
const app = express() 

const argv = require('minimist')(process.argv.slice(2)) 
argv['port']
const port = argv['port'] || process.env.PORT || 5000 
 
// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
}); 

app.get('/app/', (req, res) => {  // Define Checkpoint 
    // Respond with status 200  
    res.statusCode = 200; 
    // Respond with status message "OK" 
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' }); 

    res.end(res.statusCode+ ' ' +res.statusMessage)
});  

app.get('/app/flip/', (req, res) => {  // Flip a coin and return the result 
    // Respond with status 200 
    res.statusCode = 200; 

    // Flip a coin using the coinFlip() function 
    const result = coinFlip();

    // Send json response based of heads or tails from resulting coin flip
    if (result == 'heads') { 
        res.json({"flip":"heads"}); 
    } 
    if (result == 'tails') { 
        res.json({"flip":"tails"}); 
    } 
});

app.get('/app/flips/:number', (req, res) => {  // Flip a coin multiple times and return results 
    // Respond with status 200
    res.statusCode = 200;
    // Set up variable for number of coin flips, array of results, and counted results
	const flips = req.params.number; 
    const results = coinFlips(flips);
    const counted = countFlips(coinFlips(flips)); 
	// Flip coin flips n times using the coinFlips function, send json response of results
    res.json({"raw":results, "summary":counted}); 
    // send json response of results 
}); 
 
app.get('/app/flip/call/heads', (req, res) => {  // Flip a coin, call heads, compare result
    // Respond with status 200 
    res.statusCode = 200; 
    // Use flipACoin function, send json response of results 
    res.json(flipACoin('heads'));
});
 
app.get('/app/flip/call/tails', (req, res) => { // Flip a coin, call heads, compare result
    // Respond with status 200
    res.statusCode = 200; 
    // Use flipACoin function, send json response of results
    res.json(flipACoin('tails')); 
}); 

app.use(function(req, res){
    // Default response for any other request
    res.status(404).send('404 NOT FOUND') 
});