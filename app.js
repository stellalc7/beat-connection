const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
// const path = require('path'); // do i need to change this
var request = require('request');

// put environmental variables defined in .env file on process.env
require('dotenv').config(); 
const app = express();

// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

// const access_token = {
//   url: `https://www.mixcloud.com/oauth/authorize?client_id=${process.env.CLIENT_ID }&redirect_uri=${REDIRECT_URI}`
// };

// https://api.mixcloud.com/discover/city:athens/

app.get('/api', (req, resp, body) => {
  console.log(`test`);

  request.get(function(error, response, body) {
      // User Input => 1st popular stream
      const urlStart = 'https://api.mixcloud.com/discover/city';
      const city = req.query.city;                    // from query string
      const url = `${urlStart}:${city}`;

      console.log(`Fetching: ${url}`);

      fetch(url)
        .then(apiResponse => apiResponse.json())
        .then(data => resp.send(data))
        .catch(error => resp.send(error));
  })
});


// Heroku sets process.env.PORT in production; use 8000 in dev
const PORT = process.env.PORT || 8000;
// start up a server listening at PORT; on success, log a message
app.listen(PORT, () => {
  // console.log(app._router.stack);               // check routes
  console.log(`Listening at localhost:${PORT}`);
});


/* // baby test code that worked
app.get('/api', (req, resp, body) => {
  request.post(authVars, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;

    // get artist ID from user input
    const urlStart = 'https://api.spotify.com/v1/search';
    const artistName = req.query.artistName;                    // from query string
    const url = `${urlStart}?q=${artistName}&type=artist`;
    console.log(`Fetching: ${url}`);

    fetch(url, {method: 'GET', headers: {'Authorization': 'Bearer ' + token}, json: true})
      .then(apiResponse => apiResponse.json())
      .then(data => resp.send(data))
      .catch(error => resp.send(error));
    }
  })
});
*/