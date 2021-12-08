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


const authVars = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID  + ':' + process.env.CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


app.get('/api', (req, resp, body) => {
  request.post(authVars, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;

      // User Input => Artist ID
      const urlStart = 'https://api.spotify.com/v1/search';
      const artistName = req.query.artistName;                    // from query string
      const url = `${urlStart}?q=${artistName}&type=artist`;
      console.log(`Fetching: ${url}`);
      const getArtistID = await fetch(url, {method: 'GET', headers: {'Authorization': 'Bearer ' + token}, json: true})
        .then(apiResponse => apiResponse.json())
        
      // Artist ID => Related Artist
      const relatedUrlStart = 'https://api.spotify.com/v1/artists';
      const artistID = getArtistID.artists.items[0].id; // 
      const relatedUrl = `${relatedUrlStart}/${artistID}/related-artists`;
      console.log(`Fetching: ${relatedUrl}`);
      const relatedArtist = await fetch(relatedUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + token}, json: true})
        .then(apiResponse => apiResponse.json())
        .then(data => resp.send(data))
        .catch(error => resp.send(error));
    }
  })
});


/*
QUESTIONS
1. are we grabbing auth token once, and passing the same header thru both fetches?
2. is performance affected if i make more await api calls to grab more data from spotify? is there a more optimal way to code it?
3. 
*/


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