## <a href="https://beatconnection.herokuapp.com" target="_blank">Beat Connection</a>
```
Behold, our beat connections (っ˘з(˘⌣˘ ) ♡
Listen to popular streams around the world.
```

### Play with it <a href="https://beatconnection.herokuapp.com" target="_blank">here</a>.

<p align='center'>
  <img width="800" alt="Screenshot 2022-02-02 at 21 19 22" src="https://user-images.githubusercontent.com/17345270/152270629-9e3c7f0d-f840-426d-a4cc-3d58a0a6ca3f.png">
</p>

## Functionalities
- An interactive globe connects cities (from user input) with bezier curves.
- Listen to streams on-site.
- Current stream location propogates rings.
- Current stream location's local time, and weather conditions are available.

## Technologies
- NodeJS, ExpressJS, HTML, CSS
- <s>Spotify API</s>
- Mixcloud API
- OpenWeatherMap API
- News API
- Globe.GL

## Code
Initially, I opted for the `Spotify API` to fetch a related artist from an artist the user inputs. Originally, the goal was to 'discover similar artists to listen to around the world'. Quickly, I realized this idea was not as straightforward as I had imagined. Frst, I noticed most related artists are from the same region. Also, Spotify removed artist location data a few years ago. I considered inherently searching for countries with a genre through playlists, to get 1 track from a fetched playlist, and plot the track/artist over the country - i.e. 'Bolivian rap'. This equation would likely require a lot of testing - obscure genres, coupled with specific countries, etc.
```js
// BACKEND SPOTIFY API CALL
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

The `Mixcloud API` offers streams posted by users around the world - DJ sets, rave recordings, etc. I modified my concept to 'streams around the world', and allow users to input cities instead.
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

<!-- ## Sources
https://globe.gl/<br>
https://www.mixcloud.com/developers/#connections-lists<br>
https://www.mixcloud.com/developers/widget/#methods<br>
https://developer.spotify.com/console/get-search-item/<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>

## Notes
- Smoother loading / setTimeout?
- Top news locally (meaning in that country)
- Make local time update automatically
-->

## Funny not not bugs
- I tried searching some country names, e.g. Italy. It turns out <a href="https://ci.italy.tx.us/
https://ci.italy.tx.us/" target="_blank">there's a small town in Texas called Italy</a>. So there isn't an error per se, but I'm fetching Italy, TX local conditions, with a stream from the country Italy (proabably - at least most of the time).
<img width="600" alt="Screenshot 2022-02-02 at 22 59 56" src="https://user-images.githubusercontent.com/17345270/152279240-f0491aa7-9c9d-4747-9ac0-8e6aa51096b4.png">
- Korea is in Poland.
<img width="600" alt="Screenshot 2022-02-02 at 23 06 18" src="https://user-images.githubusercontent.com/17345270/152279570-608c4e6f-69d7-4a12-ad2c-ce2cd553cfdc.png">

## Shout outs
Big hugs to everyone who gave me coding wisdom + inspiration.
