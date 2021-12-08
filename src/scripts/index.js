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
const myGlobe = Globe({ rendererConfig: {
                          autoclear: false,
                          powerPreference: "low-power",
                          // context: this
                        },
                            waitForGlobeReady: false,
                            animateIn: false })
myGlobe(globeViz)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .backgroundColor('black')
  .atmosphereColor('pink')
  (document.getElementById('globeViz'))


/*   ------------------------- API -------------------------   */
// backend request
const getRelatedArtist = (query) => {
  let relatedArtist;
  return fetch(`/api?artistName=${encodeURIComponent(query)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      // console.log(data.artists[0].name);
      relatedArtist = data.artists[0].name;
      return relatedArtist;
      // console.log('1' + relatedArtist);
      // console.log(data);
    })
    // console.log('2' +relatedArtist);
    // return relatedArtist;
}

// #search-artist form: artist name from user input
const searchArtist = document.getElementById('search-artist');
searchArtist.addEventListener('submit', function(e) {
  e.preventDefault();
  const artist = searchArtist.querySelector("input[type='text']").value.split(' ').join('%20');
  const relatedArtist = getRelatedArtist(artist);

  arcsData.push({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)], ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]]
  });

  console.log(arcsData);

  labelsData.push({
    name: `${artist.split('%20').join(' ')}`,
    lat: arcsData[arcsData.length-1].startLat,
    lng: arcsData[arcsData.length-1].startLng
  })

  labelsData.push({
    name: `${relatedArtist}`,
    lat: arcsData[arcsData.length-1].endLat,
    lng: arcsData[arcsData.length-1].endLng
  })

  console.log(labelsData)
  
  myGlobe(globeViz)
    .arcsData(arcsData)
    .labelsData(labelsData)
    .labelLat(d => d.lat)
    .labelLng(d => d.lng)
    .labelText(d => d.name)
    .labelDotRadius(2)
    .labelColor(() => 'pink')
    // .labelLat(labelsData.lat)
    // .labelLng(labelsData.lng)
    // .labelText(labelsData.name)
    .arcColor('color')
    .arcDashGap(() => Math.random())
    .arcDashAnimateTime(() => Math.random() * 4000 + 500)
    (document.getElementById('globeViz'))
})