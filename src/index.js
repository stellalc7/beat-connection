document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const h2 = document.createElement('h2');
    h2.innerText = "BEAT \n CONNECTION";
    body.append(h2);
    const description = document.createElement('p');
    description.innerText = "Find similar artists to listen to around the world."
    body.append(description);

    // Gen random data
    const N = 10;
    const arcsData = [...Array(N).keys()].map(() => ({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)], ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]]
    }));

    Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .arcsData(arcsData)
      .arcColor('color')
      // .arcDashLength(() => Math.random())
      .arcDashGap(() => Math.random())
      .backgroundColor('black')
      // .width(window.innerWidth)
      // .height(window.innerHeight)
      .atmosphereColor('pink')

      .arcDashAnimateTime(() => Math.random() * 4000 + 500)
      (document.getElementById('globeViz'))
      // fetch('../datasets/ne_110m_admin_0_countries.geojson')
      // ${d.ADMIN} (${d.ISO_A2})
});

// get data from backend, which is getting data from Spotify API
const getArtist = (query) => {
  fetch(`/api?artistName=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}

// #search-artist form - artist name from user input
const searchArtist = document.getElementById('search-artist');
searchArtist.addEventListener('submit', function(e) {
    // prevent page refresh between searches
    e.preventDefault();
    const artist = searchArtist.querySelector("input[type='text']").value;
    console.log(artist)

    getArtist(artist);
    // put new dot and arc
})