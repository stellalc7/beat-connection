## World, Music
In World, Music, you will be able to hopefully:
- enter an artist that you enjoy listening to
- a related/similar artist will be found somewhere around the world, and mapped on an interactive globe
- you can click on a point denoting the location the artist is associated with, and find a link to that artist's Spotify page
- (^ that will be replaced with an animation / moving the globe along a bezier curve to the next track/location)
- curves will be drawn connecting artist to (related) artist around the world; a gradient will be used to denote your prior "curve"
- one day, ideally, you will be able to preview tracks on-site
- (artists' true location data will need to be adjusted in the future - Spotify removed these data a few years ago, so the site is using the `market` metric as a placeholder, just to get functionalities running)

## Wireframe
v0 test .. globe via globe.gl:<br>
<img width="771" alt="Screenshot 2021-12-02 at 22 16 47" src="https://user-images.githubusercontent.com/17345270/144539122-81781c31-01ee-4231-9f02-bd3178c27710.png">

## Technologies
- Spotify API
- three.js
- globe.gl (earth, bezier curves)

## Timeline
FRI, 3 DEC : spotify api. set up skeleton to quasi integrate three.js<br>
SAT, 4 DEC : artist "location" - assume ISO code, get country's capital, convert to lat/lon<br>
SUN, 5 DEC : render a earth with three.js / globe.gl, map artist's location lat/lon <br>
MON, 6 DEC : continue what's undone<br>
TUE, 7 DEC : bezier curves - interactive/animation thing along the bezier curve to land on the next artist/location<br>
WED, 8 DEC : local conditions, fix artist location data - probably need another api

## Sources
https://globe.gl/<br>
https://threejs.org/<br>
https://gist.github.com/tadast/8827699<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
https://developer.spotify.com/documentation/general/guides/track-relinking-guide/
