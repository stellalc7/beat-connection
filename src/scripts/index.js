import Globe from 'globe.gl';

/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const h2 = document.createElement('h2');
h2.innerText = "BEAT \n C♡NNECTI♡N";
body.append(h2);

const description = document.createElement('p');
description.innerText = "Listen to popular streams around the world."
body.append(description);

var iframe = document.createElement('iframe');
// body.append(iframe);

/*   ------------------------- GLOBE -------------------------   */
let arcsData = [];
let lons = [];
let lats = [];
// const labelsData = [];
let myGlobe = Globe({ rendererConfig: {
                              autoclear: false,
                              powerPreference: "low-power",
                              // context: this
                            },
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

let searchCity = document.getElementById('search-city');
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;
  fetch(url)
    .then(response => response.json())
    .then(data =>
      iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24),
      body.append(iframe)
      )
    .catch(error => console.log(error));

  let coords = await fetch(`/api?searchCity=${encodeURIComponent(city)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      return data[0];
    })

    console.log(coords)
    lons.push(coords.lon)
    lats.push(coords.lat)
    // console.log('lons: ' + lons);
    // console.log('lats: ' + lats);
    
    // rings only @ current stream loc, i.e. last lat/lon in arr
    let rData = [{
      lat: lats[lats.length-1],
      lng: lons[lats.length-1],
      maxR: 10,
      propagationSpeed: 2,
      repeatPeriod: 1000
    }]

    if (lons.length === 1) {
      myGlobe(globeViz)
        .ringsData(rData)
        .ringColor(() => '#00FFB6')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
      (document.getElementById('globeViz'))
    } else {
      arcsData.push({
        startLat: lats[lats.length-2],
        startLng: lons[lons.length-2],
        endLat: lats[lats.length-1],
        endLng: lons[lons.length-1],
        color: [
          ['pink', 'magenta'][Math.round(Math.random())],
          ['pink', 'magenta'][Math.round(Math.random())]
        ]
      });
      // console.log(arcsData);
      myGlobe(globeViz)
        .ringsData(rData)
        .ringColor(() => '#00FFB6')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .arcsData(arcsData)
        .arcColor('color')
        // .arcDashGap(Math.random())
        .arcDashAnimateTime(5000)
      (document.getElementById('globeViz'))
    }
});