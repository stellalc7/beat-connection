## Beat Connection
<a href="https://beatconnection.herokuapp.com" target="_blank">Beat Connection</a> is data exploration /
- enter an artist who you enjoy listening to
- find similar artists to listen to around the world
- this site is undone


## Behold - our beat connections (っ˘з(˘⌣˘ ) ♡
MVP: Allow the user to enter an artist they enjoy listening to. Retrieve a related artist via Spotify's API. Connect artists around an interactive globe with bezier curves.<br><br>
<img width="1319" alt="Screenshot 2021-12-05 at 23 12 14" src="https://user-images.githubusercontent.com/17345270/144786053-d65fd2a0-570f-42e2-a8f4-23f3f89bce6d.png">


## Technologies
- Spotify API
- globe.gl


## Code snippet
artist name (i.e. user input) => artist id
```
const urlStart = 'https://api.spotify.com/v1/search';
const artistName = req.query.artistName;
const url = `${urlStart}?q=${artistName}&type=artist`;
const getArtistID = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
```
  
artist id => related artist
```
const relatedUrlStart = 'https://api.spotify.com/v1/artists';
const artistID = getArtistID.artists.items[0].id;
const relatedUrl = `${relatedUrlStart}/${artistID}/related-artists`;
const relatedArtist = await fetch(relatedUrl, { method: 'GET', headers: { 'Authorization': 'Bearer ' + token }, json: true })
  .then(apiResponse => apiResponse.json())
  .then(data => resp.send(data))
  .catch(error => resp.send(error));
```


## Future research
- API: access location artists are based in
- API: related artists often are from the same region, how do I recommend similar artists elsewhere?
- adjust user interactions depending on API possibilities / limitations
- displaying artist data
- mobile friendliness
- (tahj's idea - can we zoom in on an artist, and proportionally magnify the volume of their track playing? research for playing tracks on-site)


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
