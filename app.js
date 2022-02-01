const { response } = require('express');
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


// app.get('/api', (req, resp, body) => {
//   console.log('backend')
//   request.post(function(error, response, body) {
//     const geoUrlStart = 'http://api.openweathermap.org/geo/1.0/direct?q';
//     let city = req.query.city;
//     console.log(city)
//     const geoUrl = `${geoUrlStart}=${city}&appid=${process.env.API_KEY}`;
//     fetch(geoUrl)
//       .then(response => response.json())
//       .then(coords => response.send(coords))
//       .catch(error => console.log(error))
//   })
// });

app.get('/api', (request, response) => {
  const geoUrlStart = 'http://api.openweathermap.org/geo/1.0/direct?q';
  const apiKey = process.env.API_KEY;
  let searchTerm = request.query.searchTerm; // from query string
  // const url = `${urlStart}/${apiKey}/search.php?s=${searchTerm}`;
  let geoUrl = `${geoUrlStart}=${searchTerm}&appid=${apiKey}`;

  console.log(`Fetching: ${geoUrl}`);

  fetch(geoUrl) // AJAX request to API
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data.first))
    .catch(error => response.send(error));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // console.log(app._router.stack);               // check routes
  console.log(`Listening at localhost:${PORT}`);
});
