## world-music
in world, music, users will be able to:
- enter a track they enjoy listening to
- a related/similar track will be found somewhere around the world, and mapped on an interactive globe
- a user will be able to click on the country, and find a link to that artist's SoundCloud (tentative) page - or if I figure out the SoundCloud SDK, the user will be able to play the track directly on-site
- lines will be drawn connecting track to track around the world; a gradient will be used to denote the user's prior "location"

## research
- finding related track and its "location" - as in where the artist is from - via SoundCloud API on a page
- autofill? what if the track doesn't exist on SoundCloud - what if a location isn't appended!!
- globe design
- what if a user wants to search a new song?
- what if a related track doesn't exist?

## wireframe
v0 (i did not draw this globe - thank you globe.gl - quasi high fidelity):<br>
<img width="771" alt="Screenshot 2021-12-02 at 22 16 47" src="https://user-images.githubusercontent.com/17345270/144539122-81781c31-01ee-4231-9f02-bd3178c27710.png">


## technologies
- related tracks will be found via the SoundCloud API
- the globe will be rendered and designed with three.js
- i believe the track connection lines need d3.js (bezier curves?), time permitting

## timeline
FRI, 3 DEC : does the API work? enter a track, find a related track/location, find another (in a new location). test pot'l issues above. set up skeleton to quasi integrate three.js<br>
SAT, 4 DEC : can I render a sphere with three.js, let's make it an earth<br>
SUN, 5 DEC : are there boundaries for countries? how does this work with track locations<br>
MON, 6 DEC : map a track to a country, and link a related track<br>
TUE, 7 DEC : put it all together, draw lines linking tracks on the globe<br>
WED, 8 DEC : finish things up - maybe i have time for extra stuff

## sources
https://globe.gl/<br>
https://threejs.org/<br>
https://developers.soundcloud.com/docs/api/explorer/open-api#/tracks/get_tracks__track_id__related
