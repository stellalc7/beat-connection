document.addEventListener("DOMContentLoaded", () => {
    const body = document.body
    const h2 = document.createElement('h2')
    h2.innerText = "WORLD, MUSIC"
    body.append(h2)
    // body.append(searchArtist)

    // const searchArtist = document.createElement("form");
    // searchArtist.setAttribute("id", "search-artist");
    // body.append(searchArtist);
    // const artistName = document.createElement("input");
    // artistName.setAttribute("type", "text");
    // artistName.setAttribute("value", "")
    // document.getElementById("search-artist").appendChild(artistName);
    // create a button

    // Gen random data
    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [['red', 'pink', 'white'][Math.round(Math.random() * 3)], ['red', 'pink', 'white'][Math.round(Math.random() * 3)]]
    }));

    Globe()
        // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .arcsData(arcsData)
        .arcColor('color')
        // .arcDashLength(() => Math.random())
        .arcDashGap(() => Math.random())
        .backgroundColor('black')

        .arcDashAnimateTime(() => Math.random() * 4000 + 500)
        (document.getElementById('globeViz'))
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