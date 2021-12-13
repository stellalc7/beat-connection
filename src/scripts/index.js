import Globe from 'globe.gl';

/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const h2 = document.createElement('h2');
h2.innerText = "BEAT \n C♡NNECTI♡N";
body.append(h2);

const description = document.createElement('p');
description.innerText = "Find popular streams around the world."
body.append(description);

// var a = document.createElement('a');
// var gitlink = document.createTextNode("X");
// a.appendChild(gitlink);
// // a.title = "X";
// a.href = "http://github.com/stellalc7";
// body.appendChild(a);

// var a = document.createElement('a');
// var portfolio = document.createTextNode("O");
// a.appendChild(portfolio);
// // a.title = "O";
// a.href = "http://heystella.io";
// body.appendChild(a);


/*   ------------------------- GLOBE -------------------------   */
const arcsData = [];
// const labelsData = [];
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
// const getRelatedArtist = (query) => {
//   const relatedArtist = fetch(`/api?artistName=${encodeURIComponent(query)}`)
//     .then(res => res.json()) // maybe don't need
//     .then(data => {
//       console.log('1 api: ' + data.artists[0].name);
//       return data.artists[0].name;
//     })
//   // return relatedArtist;
// }

// #search-artist form: artist name from user input
const searchCity = document.getElementById('search-city');
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');

  // console.log('before rel artist');
  // const relatedArtist = await getRelatedArtist(artist);  

  // API request to backend
  const track = await fetch(`/api?city=${encodeURIComponent(city)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      console.log(data);
      // return data.artists[0].name;
    })

  arcsData.push({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)],
      ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]
    ]
  });

  // labelsData.push({
  //   name: `${artist.split('%20').join(' ')}`,
  //   lat: arcsData[arcsData.length-1].startLat,
  //   lng: arcsData[arcsData.length-1].startLng
  // });

  // labelsData.push({
  //   name: `${relatedArtist}`,
  //   lat: arcsData[arcsData.length-1].endLat,
  //   lng: arcsData[arcsData.length-1].endLng
  // });
  
  myGlobe(globeViz)
    .arcsData(arcsData)
    // .labelsData(labelsData)
    // .labelLat(d => d.lat)
    // .labelLng(d => d.lng)
    // .labelText(d => d.name)
    // .labelSize(2)
    // .labelDotRadius(0.75)
    // .labelColor(() => 'pink')
    // .onLabelHover(label, prevlabel)
    .arcColor('color')
    .arcDashGap(() => Math.random())
    .arcDashAnimateTime(() => Math.random() * 4000 + 500)
    (document.getElementById('globeViz'))
});