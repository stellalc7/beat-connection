# world-music
In World, Music, users will be able to:
- enter an track they enjoy listening to
- a related/similar track will be found somewhere around the world, and mapped on an interactive globe
- a user will be able to click on the country, and find a link to that artist's SoundCloud (tentative) page - or if I figure out the SoundCloud SDK, the user will be able to play the track directly on-site
- lines will be drawn connecting track to track around the world; a gradient will be used to denote the user's prior "location"

# research
- finding related track and its "location" - as in where the artist is from - via SoundCloud API on a page
- autofill? what if the track doesn't exist on SoundCloud - what if a location isn't appended!!
- globe design
- what if a user wants to search a new song?

# WIREFRAME
v0:<br>
<img width="829" alt="Screenshot 2021-12-02 at 17 39 15" src="https://user-images.githubusercontent.com/17345270/144514525-17103aae-895f-4dfb-a420-12d09a819316.png">


# Technologies
- Related tracks will be found via the SoundCloud API
- The globe will be rendered and designed with three.js

# TIMELINE
FRI, 3 DEC : gah, does the API work<br>
SAT, 4 DEC : eek, hopefully the API works<br>
SUN, 5 DEC : can I render a sphere with three.js, make it a globe, carve out countries<br>
MON, 6 DEC : i have a globe, let's map a track to a country<br>
TUE, 7 DEC : let's put it all together, draw lines linking tracks on the globe<br>
WED, 8 DEC : let's clean it up, and make it pretty
