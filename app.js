const { response } = require('express');
const express = require('express'); // web framework
const fetch = require('node-fetch'); // for making AJAX requests
// const path = require('path'); // do i need to change this
var request = require('request');

// put environmental variables defined in .env file on process.env
require('dotenv').config(); 
const app = express();

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/src/images/favicon.ico'));

// serve files / assets from the dist folder
app.use(express.static('dist')); 

// in response to `GET /` requests, send the file `dist/index.html`
app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/api', (request, response) => {
  const apiKey = process.env.API_KEY;
  const geoUrlStart = 'https://api.openweathermap.org/data/2.5/weather?q'
    // console.log(request)
  let searchTerm = request.query.searchTerm;
  let geoUrl = `${geoUrlStart}=${searchTerm}&units=metric&appid=${apiKey}`;
  fetch(geoUrl) // AJAX request to API
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data))
    .catch(error => response.send(error));
});

// https://newsapi.org/
// app.get('/news', (request, response) => {
//   const newsApiKey = process.env.NEWS_API_KEY;
//   const newsUrlStart = 'https://newsapi.org/v2/everything?q'
//   let searchTerm = request.query.searchTerm;
//   let newsUrl = `${newsUrlStart}=${searchTerm}&sortBy=popularity&apiKey=${newsApiKey}`;
//   fetch(newsUrl) // AJAX request to API
//     .then(apiResponse => apiResponse.json())
//     .then(goodNews => response.send(goodNews))
//     .catch(error => response.send(error));
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  // console.log(app._router.stack);               // check routes
  console.log(`Listening at localhost:${PORT}`);
});
