import Globe from 'globe.gl';


/*   ------------------------- DOM ELEMENTS -------------------------   */
const body = document.body;
const h2 = document.createElement('h2');
h2.innerText = "BEAT \n C♡NNECTI♡N";
body.append(h2);

// const description = document.createElement('p');
// description.innerText = "Listen to popular streams around the world."
// body.append(description);

var iframe = document.createElement('iframe');
// iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=/mixmastermorris/mixmaster-morris-stockholm-hosoi-1/';
// iframe.frameborder= "0";
// iframe.width = "100%";
body.append(iframe);

{/* <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fmixmastermorris%2Fmixmaster-morris-stockholm-hosoi-1%2F" frameborder="0" ></iframe> */}
https://www.mixcloud.com/mixmastermorris/mixmaster-morris-stockholm-hosoi-1/


{/* <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Faotns%2Fathens-of-the-north-vol2%2F" frameborder="0" ></iframe> */}

{/* <iframe width="100%" height="120"
  src="https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fspartacus%2Fparty-time%2F&amp;hide_cover=1&amp;light=1"
  frameborder="0">
</iframe> */}


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
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;

  // console.log(`Fetching: ${url}`);
  let suffix; 
  fetch(url)
    .then(response => response.json())
    .then(data =>
      iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24),
      )
    .catch(error => console.log(error));

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