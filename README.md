## Behold - our <a href="https://beatconnection.herokuapp.com" target="_blank">Beat Connections</a> (っ˘з(˘⌣˘ ) ♡
<i>Enter a city. Listen to popular streams around the world.</i>

https://user-images.githubusercontent.com/17345270/151915430-0ba79829-2c3e-4cb3-b1df-7f2975a73ae2.mov


## Technologies
- NodeJS, ExpressJS, HTML, CSS
- <s>Spotify API</s>
- Mixcloud API for streams
- OpenWeatherMap API for coordinates
- Globe.GL for connecting beats

## Code snippet
Initially, I opted for the Spotify API as it sounded the most robust and reliable to allow users to input an artist they enjoy listening to. From their input, a related artist was fetched. The original goal was to discover similar artists to listen to around the world.
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
As I kept coding, I realized it was unwise of me to assume Spotify's API offered artist location data - they had made this obselete a few years ago. So, I was just fetching the first related artist, and mapping it in a Math.random() location - for proof of concept / my school presentation as we had a 1 week deadline. Then, I decided to formulate my API call to inherently search for countries with a genre type through playlists, to get 1 track from playlists, and mapping it over the country - i.e. 'Bolivian rap' - would give me a few playlists theortically, and I could map the first track in the most popular playlist. I also expected I'd have tot ake care of a lot of edge cases if I wrote my API call with this formula.

So, I played with more APIs and discovered Mixcloud, which offers streams posted by users around the world - live shows, DJ sets, rave recordings, etc. I decided to slightly modify my concept to 'streams around the world' and allow the user to input a city. I continue to use Express on the backend to fetch coordinate data via the OpenWeatherMap API with the user input, and grab a random Mixcloud stream from that city. The site now also features an iframe to listen to the streams directly on-site.

In the future, I would like to make a site that allows users - or, well me at least - to discover similar artists around the world, so hopefully I can make a Beat Connections 2.0 that does that, with Spotify - by writing an API formula to transcend immediate streaming behavior / the algorithm.


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
