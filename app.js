const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
const path = require('path'); // do i need to change this
var request = require('request'); //
// import fetch from 'node-fetch';

// put environmental variables defined in .env file on process.env
require('dotenv').config(); 
const app = express();

// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// get auth token ONCE - input for auth token with credentials

// var client_id = '5f54c2557fd24e00820a6401cf913dff';
// var client_secret = '646f17419ce74ed2bcdfa7bdf836a606';
const authVars = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    // 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID  + ':' + process.env.CLIENT_SECRET).toString('base64'))
    // 'Authorization': 'Basic ' + (process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


app.get('/api', (req, resp, body) => {
  // console.log('callback test');

  request.post(authVars, function(error, response, body) {
    console.log('test post')
    console.log(body)
    if (!error && response.statusCode === 200) {
      console.log('test if')
      var token = body.access_token;

    // get artist ID from user input => then get 1 related artist later
      const urlStart = 'https://api.spotify.com/v1/search?q=';
      // console.log("testing");
      console.log(authVars);
      const artistName = req.query.artistName; // from query string
      const url = `${urlStart}?q=${artistName}&type=artist`;
      console.log(`Fetching: ${url}`);

      fetch(url, {method: 'GET', headers: {'Authorization': 'Bearer ' + token}, json: true})
        .then(apiResponse => apiResponse.json())
        .then(data => resp.send(data)) // change to "related artist" to send to frontend
        .catch(error => resp.send(error));
        

    // request.get(options, function(error, response, body) {
    //   console.log(body);
    // });
    }
  })
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  console.log(app._router.stack);
  console.log(`Listening at localhost:${PORT}`);
});


