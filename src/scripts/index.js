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
body.append(iframe);


/*   ------------------------- GLOBE -------------------------   */
// let arcsData = [];
let rData = [];
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
  
  // const urlStart = 'https://api.mixcloud.com/search';
  // const url = `${urlStart}/?q=${city}&type=cloudcast`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data =>
  //     iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24)
  //     )
  //   .catch(error => console.log(error));

    let coords = await fetch(`/api?searchCity=${encodeURIComponent(city)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      return data[0];
    })

    lons.push(coords.lon)
    lats.push(coords.lat)

    console.log('lons: ' + lons);
    console.log('lats: ' + lats);

    if (lons.length === 1) {
      console.log('make a dot')
    } else {
      console.log('make a dot in new location')
      console.log('make a connection')
    }

    rData = [{
      lat: lats[0],
      lng: lons[0],
      maxR: Math.random() * 20 + 3,
      propagationSpeed: (Math.random() - 0.5) * 20 + 1,
      repeatPeriod: Math.random() * 2000 + 200
    }]

    console.log(rData)
  
  myGlobe(globeViz)
    .ringsData(rData)
    .ringColor(() => '#FF00EC')
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod')
  (document.getElementById('globeViz'))

  // arcsData.push({
  //   startLat: lats[lats.length-2],
  //   startLng: lons[lons.length-2],
  //   endLat: lons[lons.length-1],
  //   endLng: lons[lons.length-1],
  //   color: [
  //     ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)],
  //     ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]
  //   ]
  // });
  // labelsData.push({
  //   name: `${city.split('%20').join(' ')}`,
  //   lat: arcsData[arcsData.length-1].startLat,
  //   lng: arcsData[arcsData.length-1].startLng
  // });
  // labelsData.push({
  //   name: `${city}`,
  //   lat: arcsData[arcsData.length-1].endLat,
  //   lng: arcsData[arcsData.length-1].endLng
  // });

  // myGlobe(globeViz)
  //   .ringsData(rData)
  //   .ringColor(() => colorInterpolator)
  //   .ringMaxRadius('maxR')
  //   .ringPropagationSpeed('propagationSpeed')
  //   .ringRepeatPeriod('repeatPeriod')
  //   // .arcsData(arcsData)
  //   // .labelsData(labelsData)
  //   // .labelLat(d => d.lat)
  //   // .labelLng(d => d.lng)
  //   // .labelText(d => d.name)
  //   // .labelSize(2)
  //   // .labelDotRadius(0.75)
  //   // .labelColor(() => 'pink')
  //   // .onLabelHover(label, prevlabel)
  //   // .arcColor('color')
  //   // .arcDashGap(() => Math.random())
  //   // .arcDashAnimateTime(() => Math.random() * 4000 + 500)
  //   (document.getElementById('globeViz'))
});