import Globe from 'globe.gl';

/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const title = document.createElement('h2');
title.innerText = "BEAT \n C♡NNECTI♡N";
body.append(title);

const description = document.createElement('p');
description.innerText = "Listen to popular streams around the world."
body.append(description);

let currentLocation = document.createElement('h1');
let localTemp = document.createElement('h3');
let localTime = document.createElement('h4');

var iframe = document.createElement('iframe');

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

function getTime(timezone) {
  var d = new Date(new Date().getTime() + (timezone * 1000));   // convert API offset to ms
  var hh = d.getUTCHours();
  var mm = d.getUTCMinutes();
  return (`${hh}:${mm}`)
}

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

  let data = await fetch(`/api?searchTerm=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      return data
    })

    console.log(data)
    // debugger
    currentLocation.innerText = data.name;
    body.append(currentLocation);

    localTemp.innerText = `${Math.round(data.main.temp)}°, ${data.weather[0].description}`;
    body.append(localTemp);

    localTime.innerText = getTime(data.timezone);;
    body.append(localTime);

    lons.push(data.coord.lon)
    lats.push(data.coord.lat)
    console.log('lons: ' + lons);
    console.log('lats: ' + lats);
    
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
        .ringColor(() => '#00ffc8')
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
        .ringColor(() => '#00ffc8')
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