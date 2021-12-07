import Globe from 'globe.gl';

/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const h2 = document.createElement('h2');
h2.innerText = "BEAT \n C♡NNECTI♡N";
body.append(h2);
const description = document.createElement('p');
description.innerText = "Find similar artists to listen to around the world."
body.append(description);

/*   ------------------------- GLOBE -------------------------   */
const arcsData = [];
const labelsData = [];
const myGlobe = Globe({ // rendererConfig: {
                          // autoclear: false,
                          // context: this
                        //},
                            waitForGlobeReady: false,
                            animateIn: false })
myGlobe(globeViz)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .backgroundColor('black')
  .atmosphereColor('pink')
  (document.getElementById('globeViz'))


/*   ------------------------- API -------------------------   */
// backend request
const getRelatedArtist = (query) => {
  fetch(`/api?artistName=${encodeURIComponent(query)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      // console.log(data.artists.items[0].id);
      console.log(data);
    })
}

// #search-artist form: artist name from user input
const searchArtist = document.getElementById('search-artist');
searchArtist.addEventListener('submit', function(e) {
  e.preventDefault();
  const artist = searchArtist.querySelector("input[type='text']").value.split(' ').join('%20');
  // console.log(artist);
  getRelatedArtist(artist);

  arcsData.push({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)], ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]]
  });
  
  // labelsData.push({
  //   labelText: `${artist}`,
  //   labelLat: arcsData.startLat,
  //   labelLon:arcsData.startLon
  // })

  // labelsData.push({
  //   labelText: `${artist}`,
  //   labelLat: arcsData.endLat,
  //   labelLon:arcsData.endLon
  // })

  // console.log(arcsData)
  
  myGlobe(globeViz)
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashGap(() => Math.random())
    // .labelsData(labelsData)
    .arcDashAnimateTime(() => Math.random() * 4000 + 500)
    (document.getElementById('globeViz'))
})