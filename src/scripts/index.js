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
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  
  // const urlStart = 'https://api.mixcloud.com/search';
  // const url = `${urlStart}/?q=${city}&type=cloudcast`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data =>
  //     iframe.src = 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=' + data.data[Math.floor(Math.random()*data.data.length)].url.slice(24)
  //     )
  //   .catch(error => console.log(error));

    let coords = await fetch(`/api?searchTerm=${encodeURIComponent(city)}`)
    .then(res => res.json()) // maybe don't need
    .then(data => {
      return data
    })

    console.log(coords)

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