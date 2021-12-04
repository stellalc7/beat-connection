## World, Music
In World, Music, you will be able to:
- enter an artist that you enjoy listening to
- a related/similar artist will be found somewhere around the world, and mapped on an interactive globe
- you can click on a point denoting the location the artist is associated with, and find a link to that artist's Spotify page
- (^ that will be replaced with an animation / moving the globe along a bezier curve to the next track/location)
- curves will be drawn connecting track to track around the world; a gradient will be used to denote your prior "curve"
- one day you will be able to preview tracks on-site, I hope

<!--## Research
- finding related track and its "location" - as in where the artist is from?
- what if there are multiple uploads for the same track, can i find a reliable one?
- autofill? what if the track doesn't exist on soundcloud - what if a location isn't appended?
- globe design
- what if a user wants to search a new song?
- what if a related track doesn't exist?-->

## Wireframe
v0 test .. globe via globe.gl:<br>
<img width="771" alt="Screenshot 2021-12-02 at 22 16 47" src="https://user-images.githubusercontent.com/17345270/144539122-81781c31-01ee-4231-9f02-bd3178c27710.png">

## Technologies
- Spotify API
- three.js
- d3.js (bezier curves)

## Timeline
FRI, 3 DEC : spotify api. set up skeleton to quasi integrate three.js<br>
SAT, 4 DEC : artist "location" - assume ISO code, get country's capital, convert to lat/lon<br>
SUN, 5 DEC : render a earth with three.js, map artist's location lat/lon <br>
MON, 6 DEC : continue what's undone<br>
TUE, 7 DEC : bezier curves - interactive/animation thing along the bezier curve to land on the next artist/location<br>
WED, 8 DEC : local conditions, fix artist location data

## Sources
https://globe.gl/<br>
https://threejs.org/<br>
https://gist.github.com/tadast/8827699<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
https://developer.spotify.com/documentation/general/guides/track-relinking-guide/
