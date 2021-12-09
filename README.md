## Beat Connection
In <a href="beatconnection.herokuapp.com" target="_blank">Beat Connection</a>, you can:
- enter an artist who you enjoy listening to
- find similar artists to listen to around the world
- (location data do not reflect artists' home base at this time - the site is very sorry)
- new things soon ..
<!-- - a related/similar artist will be found somewhere around the world, and mapped on an interactive globe
- you can click on a point denoting the location the artist is associated with, and find a link to that artist's Spotify page
- (^ that will be replaced with an animation / moving the globe along a bezier curve to the next artist/location)
- curves will be drawn connecting artist to (related) artist around the world; a gradient will be used to denote your prior "curve"
- one day, ideally, you will be able to preview tracks on-site
- (artists' true location data will need to be adjusted in the future - Spotify removed these data a few years ago, so the site is using the `market` metric as a placeholder, just to get functionalities running) -->


## Behold - our beat connections (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ♥︎ ♥︎ ♥︎
MVP: Allow the user to enter an artist they enjoy listen to. Retrieve a related artist via Spotify's API. Connect artists around an interactive globe with bezier curves.<br><br>
<img width="1319" alt="Screenshot 2021-12-05 at 23 12 14" src="https://user-images.githubusercontent.com/17345270/144786053-d65fd2a0-570f-42e2-a8f4-23f3f89bce6d.png">


## Technologies
- Spotify API
- globe.gl


## Future research
- API: access location artists are based in
- API: related artists often are from the same region, how do I recommend similar artists elsewhere?
- adjust user interactions depending on API possibilities / limitations
- displaying artist data
- mobile friendliness
- (tahj's idea - can we zoom in on an artist, and proportionally magnify the volume of their track playing? research for playing tracks on-site)

<!-- ## Timeline
FRI, 3 DEC : spotify api. set up skeleton to quasi integrate three.js<br>
SAT, 4 DEC : artist "location" - assume ISO code, get country's capital, convert to lat/lon<br>
SUN, 5 DEC : render a earth with three.js / globe.gl, map artist's location lat/lon <br>
MON, 6 DEC : continue what's undone<br>
TUE, 7 DEC : bezier curves - interactive/animation thing along the bezier curve to land on the next artist/location<br>
WED, 8 DEC : local conditions, fix artist location data - probably need another api -->


## Sources
https://globe.gl/<br>
https://gist.github.com/tadast/8827699<br>
https://developer.spotify.com/console/get-search-item/<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
https://developer.spotify.com/documentation/general/guides/track-relinking-guide/


## Shout outs
Big hugs to everyone for coding wisdom + inspiration, and making this site possible! [links?]
