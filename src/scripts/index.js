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
let localWx = document.createElement('h3');
let localTime = document.createElement('h4');
var iframe = document.createElement('iframe');
let coordinates = document.createElement('h1')
coordinates.classList.add('coords');
let offset, coord, headline;

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

if (offset) setInterval(getTime(offset), 1000);

// locIcon.addEventListener('click', function() {
currentLocation.addEventListener('click', function() {
  if (lats.length === 1) {
    myGlobe.pointOfView({lat: lats[0], lng: lons[0], altitude: 2.5}, 4000)
  } else {
    myGlobe.pointOfView({lat: lats[lats.length-1], lng: lons[lons.length-1], altitude: 2.5}, 4000)
  }
});

currentLocation.addEventListener('mouseover', function() {
  coordinates.classList.add('coords');
  coordinates.classList.remove('hide')
  coordinates.innerText = `${coord} \n ${headline}`;
  body.append(coordinates);
});

currentLocation.addEventListener('mouseout', function() {
  coordinates.classList.add('hide');
  // body.append(coordinates);
});

let searchCity = document.getElementById('search-city');
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  const mixCloudUrlStart = 'https://api.mixcloud.com/search';

  let data = await fetch(`/api?searchTerm=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => { return data })
    // .catch(error => console.log(error))

  let cityInput = document.getElementById("search-city-name")

  if (data.message) {    // denotes errors from openwxmap
    cityInput.classList.add('error');
    cityInput.addEventListener('input', (event) => {
      cityInput.classList.remove('error');
    });
  } else {
    let url = `${mixCloudUrlStart}/?q=${city}&type=cloudcast`;
    fetch(url)
      .then(response => response.json())
      .then(data =>
        iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24),
        // iframe.autoplay = true,
        body.append(iframe),
        cityInput.classList.add('dim'),
        title.classList.add('dim')
        )
      // MIXCLOUD ERROR returns data.data = []
      // .catch(error => { ong return error });

    headline = await fetch(`/news?country=${encodeURIComponent(data.sys.country)}`)
    .then(res => res.json())
    .then(goodNews => { return goodNews.articles[0].title })
    
    currentLocation.innerText = `${data.name}`;
    body.append(currentLocation);

    let temp = `${Math.round(data.main.temp)}°`
    let wx = data.weather[0].description
    localWx.innerText = `${temp}, ${wx}`;
    body.append(localWx);
    localTime.innerText = getTime(data.timezone);
    offset = data.timezone;
    // localTime.innerText = setInterval(getTime(offset), 1000);
    body.append(localTime);

    lons.push(data.coord.lon)
    lats.push(data.coord.lat)

    let currLat, currLon;
    currLat = lats[lats.length-1];
    currLon = lons[lons.length-1];

    if (currLat < 0 && currLon < 0) {
      currLon = -currLon;
      currLat = -currLat;
      coord = `${currLat}°W, ${currLon}°S`;
    } else if (currLat < 0) {
      currLat = -currLat
      coord = `${currLat}°E, ${currLon}°S`
    } else if (currLon < 0) {
      currLon = -currLon
      coord = `${currLat}°W, ${currLon}°N`;
    } else {
      coord = `${currLat}°E, ${currLon}°N`;
    }
    
    let rData = [{
      lat: lats[lats.length-1],
      lng: lons[lats.length-1],
      maxR: 10,
      propagationSpeed: 2,
      repeatPeriod: 1000
    }]

    if (lons.length === 1) {
      myGlobe.ringsData(rData)
              .ringColor(() => '#ff0077')
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
          ['pink', 'hotpink'][Math.round(Math.random())],
          ['pink', 'hotpink'][Math.round(Math.random())]
        ]
      });
      myGlobe.ringsData(rData)
              .ringColor(() => '#ff0077')
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
  }
});