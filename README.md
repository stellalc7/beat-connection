## <a href="https://beatconnection.herokuapp.com" target="_blank"></a>, our beat connections ♡
Beat Connection invites you to search cities, and listen to streams around the world. You'll also find the local time, weather, and top headline wherever you are.

<p align='center'>
  <img width="800" alt="Screenshot 2022-02-03 at 01 41 42" src="https://user-images.githubusercontent.com/17345270/152293814-fe013df6-ab65-4f9f-b51f-3cad8f18b038.png">
</p>


### Technologies
- NodeJS, ExpressJS, HTML, CSS
- Globe.GL
- APIs: Mixcloud, OpenWeatherMap, News

### Functionalities
Beat Connection invites users to input cities, and utilizes the `Mixcloud API` to fetch a stream connected to that city.
```js
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;
  const widgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=`
  fetch(url)
    .then(response => response.json())
    .then(data =>
      iframe.src = widgetUrl + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24),
      body.append(iframe)
    )   // append the new stream for searched city
}
```
The `OpenWeatherMap API` provides coordinates, local weather conditions, and local time.
```js
// FRONTEND
let data = await fetch(`/api?searchTerm=${encodeURIComponent(city)}`)
  .then(res => res.json())
  .then(data => { return data })

// BACKEND
app.get('/api', (request, response) => {
  const apiKey = process.env.API_KEY;
  const geoUrlStart = 'https://api.openweathermap.org/data/2.5/weather?q'
  let searchTerm = request.query.searchTerm;
  let geoUrl = `${geoUrlStart}=${searchTerm}&units=metric&appid=${apiKey}`;
  let coords = fetch(geoUrl)
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data))       // to the frontend
    .catch(error => response.send(error));
});
```

<!--
### Sources
https://globe.gl/<br>
https://www.mixcloud.com/developers/#connections-lists<br>
https://www.mixcloud.com/developers/widget/#methods<br>
https://developer.spotify.com/console/get-search-item/<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
-->

<!--
### Not not bugs
 <a href="https://ci.italy.tx.us/" target="_blank">Italy, TX, USA</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 22 59 56" src="https://user-images.githubusercontent.com/17345270/152279240-f0491aa7-9c9d-4747-9ac0-8e6aa51096b4.png"><br><br>
<a href="https://en.wikipedia.org/wiki/Korea,_Gmina_Telatyn" target="_blank">Korea, Lublin Voivodeship, Poland</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 06 18" src="https://user-images.githubusercontent.com/17345270/152279570-608c4e6f-69d7-4a12-ad2c-ce2cd553cfdc.png"><br><br>
In conclusion, if a city name does not coexist with that of a country's, the country will be mapped. Antithetically, if there is a city and a country with the same name, expect dissonace between the fetched stream and plotted location, as the city will be mapped by default. If there are multiple cities with the same name (e.g. Versailles), the one everyone's probably thinking of will be mapped. If a city simply has an idiosyncratic name, that city will simply be mapped. Even if it's a ghost town. <a href="http://www.texasescapes.com/CentralTexasTownsNorth/Okay-Texas.htm" target="_blank">Okay</a>?<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 58 24" src="https://user-images.githubusercontent.com/17345270/152283908-9f92e537-dbc1-40ea-a4e6-d05411d61add.png">
-->


<!-- - Click on the globe, instead of search (what if user accidentally clicks)? Both?
- Globe zoom proportionally adjusts stream volume.
- Stream autoplay.
- themes
- Local time updates automatically.
- Top local news.
- Smoother loading / setTimeout?
- addEventListener for mouse movement if no mouse activity for X time, hide everything but the globe and local info (for projections).
- changeLanguage(city) => { } -->

### My top Mixcloud streams
- DJ Set <a href="https://www.mixcloud.com/FrankMaster/special-dj-set-marrakesh-marocco-by-frank-master-stefano-capasso/" target="_blank">Marrakesh</a>
- Cooking with Palm Trax <a href="https://www.mixcloud.com/BCR_Radio/cooking-with-palms-trax-020/" target="_blank">Berlin</a>
- Future sound of Egypt <a href="https://www.mixcloud.com/alyfila-futuresoundofegypt/future-sound-of-egypt-650-live-from-cairo-with-aly-fila/" target="_blank">Cairo</a>
