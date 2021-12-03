## World, Music
In World, Music, you will be able to:
- enter a track that you enjoy listening to
- a related/similar track will be found somewhere around the world, and mapped on an interactive globe
- you can click on a point denoting the location the song is associated with, and find a link to that artist's SoundCloud (tentative) page
- (^ that will be replaced with an animation / moving the globe along a bezier curve to the next track/location)
- if I figure out the SoundCloud SDK, you will be able to play the track on-site
- lines will be drawn connecting track to track around the world; a gradient will be used to denote your prior "location"

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
- SoundCloud or Mixcloud API
- three.js
- d3.js (bezier curves)

## Timeline
FRI, 3 DEC : does the api work? enter a track, find a related track/location, find another (in a new location). set up skeleton to quasi integrate three.js<br>
SAT, 4 DEC : can I render a sphere with three.js, let's make it an earth<br>
SUN, 5 DEC : are there boundaries for countries? how does this work with track locations<br>
MON, 6 DEC : map a track to a country, and link a related track<br>
TUE, 7 DEC : put it all together, draw lines linking tracks on the globe - interactive/animation thing along the bezier curve to land on the next track/location, local conditions<br>
WED, 8 DEC : finish things - maybe i have time for extra stuff

## Sources
https://globe.gl/<br>
https://threejs.org/<br>
https://developers.soundcloud.com/docs/api/explorer/open-api#/tracks/get_tracks__track_id__related
