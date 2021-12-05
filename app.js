const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
const path = require('path'); // do i need to change this
var request = require('request'); //
// put environmental variables defined in .env file on process.env
require('dotenv').config(); 
const app = express();

// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
//   console.log(process.env.API_KEY === "banana");
});


// var client_id = '5f54c2557fd24e00820a6401cf913dff';
// var client_secret = '646f17419ce74ed2bcdfa7bdf836a606';
// get auth token ONCE - input for auth token with credentials
const authVars = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    // 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


// `GET /cors` requests trigger this callback (like controller action)
// `request` object contains request's query string, wildcard params, etc
// `response` object has `send` method for sending our server response
// app.get('/cors', (request, response) => {
//   console.log(`Fetching: ${request.query.url}`);

//   fetch(request.query.url) // AJAX request to URL provided in query string
//     .then(apiResponse => apiResponse.json()) // parse response as JSON
//     .then(data => response.send(data)) // send parsed data to frontend
//     .catch(error => response.send(error));
// });


app.get('/api', (authVars, request, response, body) => {
  // get artist ID from user input => then get 1 related artist later
  const urlStart = 'https://api.spotify.com/v1/search';
  // const apiKey = process.env.API_KEY; // from .env (dev) or Heroku
  var token = body.access_token; // spotify auth token
  const artistName = request.query.artistName; // from query string
  const url = `${urlStart}/${artistName}&type=artist`;

  console.log(`Fetching: ${url}`);

  fetch(url) // AJAX request to API
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data))
    .catch(error => response.send(error));
});


// const getArtist = (artist) => {
//   request.post(authVars, artist, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // access token needed for artist ID => related artist
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/search/ julia%20rakel &type=artist',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       console.log(body);
//     });
//   }
// })};
// module.exports = getArtist;