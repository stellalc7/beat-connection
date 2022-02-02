## <a href="https://beatconnection.herokuapp.com" target="_blank">Beat Connection</a>
```
Behold, our beat connections (っ˘з(˘⌣˘ ) ♡
Listen to popular streams around the world.
```

'...once we can see artifacts as crystallized forms of human labor, communication, and value, the importance of how they shape activity becomes clearer.' - (Gillespie, 2003).

https://user-images.githubusercontent.com/17345270/152177744-b3266537-11dd-4386-ad20-0c6132b154fc.mov

## Functionalities
- An interactive globe connects cities (from user input) with bezier curves.
- Listen to streams on-site.
- Current stream location propogates rings.
- Current stream location's local time, and weather conditions are available.

## Goals
- Seamless interactivity: loading is still kinda choppy, can I get rid of that loader on the bottom left corner
- Most streams are quite long, like 5h! We should let the local time update by the minute.
- Less is more: everything on the page has a purpose, and we note design hierarchy
- My attention span is low, so I aim to make sites that don't reduce them further

## Technologies
- NodeJS, ExpressJS, HTML, CSS
- <s>Spotify API</s>
- Mixcloud API for streams
- OpenWeatherMap API for coordinates, timezone, weather
- Globe.GL for connecting beats

## Let me tell you a story
Initially, I opted for the Spotify API to fetch a related artist from an artist a user inputs. The original goal was to discover similar artists to listen to around the world. I quickly realized this idea was not as straightforward as I had imagined.
artist name (i.e. user input) => artist id
```
// SPOTIFY API CALL
const urlStart = 'https://api.spotify.com/v1/search';
const artistName = req.query.artistName;
const url = `${urlStart}?q=${artistName}&type=artist`;
const getArtistID = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
```  
artist id => related artist
```
// SPOTIFY API CALL
const relatedUrlStart = 'https://api.spotify.com/v1/artists';
const artistID = getArtistID.artists.items[0].id;
const relatedUrl = `${relatedUrlStart}/${artistID}/related-artists`;
const relatedArtist = await fetch(relatedUrl, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
  .then(data => resp.send(data))
  .catch(error => resp.send(error));
```

I learned Spotify removed artist location data a few years ago. So, I thought maybe I could inherently search for countries with a genre through playlists, to get 1 track from playlists, and map the track/artist over the country - i.e. 'Bolivian rap'. This equation would probably require a lot of testing - obscure genres, coupled with specific countries, etc.

I discovered the Mixcloud API, which offers streams posted by users around the world - live shows, DJ sets, rave recordings, etc. I modified my concept to 'streams around the world' and allow users to input cities instead.
```
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;
  fetch(url)
    .then(response => response.json())
    .then(data =>
      iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24),
      body.append(iframe)
      )

  // ...
}
```
I added the OpenWeatherMap API to display coordinates, local weather conditions, and local time.
```
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
  let coords = fetch(geoUrl) // AJAX request to API
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data))
    .catch(error => response.send(error));
});
```

## Sources
https://globe.gl/<br>
https://gist.github.com/tadast/8827699<br>
https://www.last.fm/api/show/geo.getTopArtists<br>
https://www.mixcloud.com/developers/#connections-lists<br>
https://www.mixcloud.com/developers/widget/#methods<br>
https://developer.spotify.com/console/get-search-item/<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
https://developer.spotify.com/documentation/general/guides/track-relinking-guide/


## Shout outs
Big hugs to everyone who gave me coding wisdom + inspiration.
