## <a href="https://beatconnection.herokuapp.com" target="_blank">Behold</a>, our beat connections (っ˘з(˘⌣˘ ) ♡
Listen to popular streams around the world.

<p align='center'>
  <img width="800" alt="Screenshot 2022-02-02 at 21 19 22" src="https://user-images.githubusercontent.com/17345270/152270629-9e3c7f0d-f840-426d-a4cc-3d58a0a6ca3f.png">
</p>

### Technologies
- NodeJS, ExpressJS, HTML, CSS
- Globe.GL
- APIs: <s>Spotify</s>, Mixcloud, OpenWeatherMap, (News)

### Functionalities
Initially, I opted for the `Spotify API` to fetch a related artist from an artist the user inputs. The concept was: 'discover similar artists to listen to around the world'. Quickly, I realized implementing this idea would not be as straightforward. Most related artists are from the same region, and Spotify removed artist location data. I considered searching for countries with a genre through playlists, to get 1 artist from a fetched playlist, and plot the artist over the country - i.e. 'Bolivian rap'. This equation would likely require a lot of testing - obscure genres, coupled with specific countries, etc.
`TLDR: I tried Spotify's API, and it didn't work, but here's my now obselete code.`
```js
// BACKEND SPOTIFY API CALLS
// artist (user input) => artist id
const urlStart = 'https://api.spotify.com/v1/search';
const artistName = req.query.artistName;
const url = `${urlStart}?q=${artistName}&type=artist`;
const getArtistID = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
  
// artist id => related artist
const relatedUrlStart = 'https://api.spotify.com/v1/artists';
const artistID = getArtistID.artists.items[0].id;
const relatedUrl = `${relatedUrlStart}/${artistID}/related-artists`;
const relatedArtist = await fetch(relatedUrl, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
  .then(data => resp.send(data))   // returned to frontend
  .catch(error => resp.send(error));
```

I refactored to use the `Mixcloud API` for 'streams around the world' - inviting users to input cities.
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

### Not not bugs
 <a href="https://ci.italy.tx.us/" target="_blank">Italy, TX, USA</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 22 59 56" src="https://user-images.githubusercontent.com/17345270/152279240-f0491aa7-9c9d-4747-9ac0-8e6aa51096b4.png"><br><br>
<a href="https://en.wikipedia.org/wiki/Korea,_Gmina_Telatyn" target="_blank">Korea, Lublin Voivodeship, Poland</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 06 18" src="https://user-images.githubusercontent.com/17345270/152279570-608c4e6f-69d7-4a12-ad2c-ce2cd553cfdc.png"><br><br>
In conclusion, if a city name does not coexist with that of a country's, the country will be mapped. Antithetically, if there is a city and a country with the same name, there may be dissonace between the fetched stream and location, as the city will be mapped. If there are multiple cities with the same name (e.g. Versailles), the one everyone's probably thinking of will be mapped. If a city simply has an idiosyncratic name, that city will be mapped. Okay?<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 58 24" src="https://user-images.githubusercontent.com/17345270/152283908-9f92e537-dbc1-40ea-a4e6-d05411d61add.png">


### Future
- Click on the globe, instead of search (what if user accidentally clicks)? Both?
- Globe zoom proportionally adjusts stream volume.
- Stream autoplay.
- Local time updates automatically.
- Top local news.
- Smoother loading / setTimeout?

### Shout outs
Big hugs to everyone who gave me coding wisdom + inspiration.
