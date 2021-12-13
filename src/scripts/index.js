import Globe from 'globe.gl';

/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const h2 = document.createElement('h2');
h2.innerText = "BEAT \n C♡NNECTI♡N";
body.append(h2);

const description = document.createElement('p');
description.innerText = "Listen to popular streams around the world."
body.append(description);

// const widget = Mixcloud.PlayerWidget(document.getElementById("my-widget-iframe"));
// body.append(widget)
// widget.ready.then(() => {
//     // Put code that interacts with the widget here
//   });

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
const searchCity = document.getElementById('search-city');
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  const city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  console.log(city);
  // const urlStart = 'https://api.mixcloud.com/discover/city';
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;

  console.log(`Fetching: ${url}`);

  fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));
    // .catch(error => response.send(error))

  // arcsData.push({
  //   startLat: (Math.random() - 0.5) * 180,
  //   startLng: (Math.random() - 0.5) * 360,
  //   endLat: (Math.random() - 0.5) * 180,
  //   endLng: (Math.random() - 0.5) * 360,
  //   color: [
  //     ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)],
  //     ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]
  //   ]
  // });

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
  
  // myGlobe(globeViz)
  //   .arcsData(arcsData)
  //   // .labelsData(labelsData)
  //   // .labelLat(d => d.lat)
  //   // .labelLng(d => d.lng)
  //   // .labelText(d => d.name)
  //   // .labelSize(2)
  //   // .labelDotRadius(0.75)
  //   // .labelColor(() => 'pink')
  //   // .onLabelHover(label, prevlabel)
  //   .arcColor('color')
  //   .arcDashGap(() => Math.random())
  //   .arcDashAnimateTime(() => Math.random() * 4000 + 500)
  //   (document.getElementById('globeViz'))
});