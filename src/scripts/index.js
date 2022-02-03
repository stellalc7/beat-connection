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
let offset;

// var locIcon = document.createElement('img');
// locIcon.src = ''
// body.append(locIcon);

/*   ------------------------- GLOBE -------------------------   */
let arcsData = [];
let lons = [];
let lats = [];
let error;
// const labelsData = [];
let myGlobe = new Globe({ rendererConfig: {
                              autoclear: false,
                              powerPreference: "low-power",
                            },
                            waitForGlobeReady: false,
                            animateIn: true })


myGlobe(globeViz)
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
  .backgroundColor('black')
  .atmosphereColor('pink')

  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 0.075;
(document.getElementById('globeViz'))

window.addEventListener('resize', (event) => {
  myGlobe.width([event.target.innerWidth])
  myGlobe.height([event.target.innerHeight])
});
/*   ------------------------- API -------------------------   */

function getTime(timezone) {
  var d = new Date(new Date().getTime() + (timezone * 1000));   // convert API offset to ms
  var hh = d.getUTCHours();
  var mm = d.getUTCMinutes();
  if (hh < 10 && mm < 10) {
    return `0${hh}:0${mm}`
    // body.append(localTime);
  } else if (hh < 10) {
    return `0${hh}:${mm}`
  } else if (mm < 10) {
    return `${hh}:0${mm}`
  } else {
    return `${hh}:${mm}`
  }
};

if (offset) {
  setInterval(getTime(offset), 1000);
}

// locIcon.addEventListener('click', function() {
currentLocation.addEventListener('click', function() {
  if (lats.length === 1) {
    myGlobe.pointOfView({lat: lats[0], lng: lons[0], altitude: 2.5}, 4000)
  } else {
    myGlobe.pointOfView({lat: lats[lats.length-1], lng: lons[lons.length-1], altitude: 2.5}, 4000)
  }
});

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
    // .catch(error => { return error });
    .catch(error => console.log(error));

  let data = await fetch(`/api?searchTerm=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      return data
    })

  let news = await fetch(`/news?searchTerm=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(goodNews => {
      console.log(goodNews.articles[0])
    })

    currentLocation.innerText = `${data.name}`;
    body.append(currentLocation);
    localTemp.innerText = `${Math.round(data.main.temp)}°, ${data.weather[0].description}`;
    body.append(localTemp);
    localTime.innerText = getTime(data.timezone);
    offset = data.timezone;
    // localTime.innerText = setInterval(getTime(offset), 1000);
    body.append(localTime);

    lons.push(data.coord.lon)
    lats.push(data.coord.lat)
    
    let rData = [{
      lat: lats[lats.length-1],
      lng: lons[lats.length-1],
      maxR: 10,
      propagationSpeed: 2,
      repeatPeriod: 1000
    }]

    if (lons.length === 1) {
      myGlobe.ringsData(rData)
             .ringColor(() => '#00ffc8')
             .ringMaxRadius('maxR')
             .ringPropagationSpeed('propagationSpeed')
             .ringRepeatPeriod('repeatPeriod')
             .pointOfView({lat: lats[0], lng: lons[0], altitude: 2.5}, 4000)
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
      myGlobe.ringsData(rData)
              .ringColor(() => '#00ffc8')
              .ringMaxRadius('maxR')
              .ringPropagationSpeed('propagationSpeed')
              .ringRepeatPeriod('repeatPeriod')
              .arcsData(arcsData)
              .arcColor('color')
              // myGlobe.arcDashGap(Math.random())
              // myGlobe.arcDashAnimateTime(5000)
              // myGlobe.arcsTransitionDuration(2000)
              .arcStroke(1.05)
              .pointOfView({lat: lats[lats.length-1], lng: lons[lons.length-1], altitude: 2.5}, 4000)
    }
});