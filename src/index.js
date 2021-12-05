const searchArtist = document.getElementById('search-artist')

// delete later
require('dotenv').config();

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body
    const h2 = document.createElement('h2')
    h2.innerText = "WORLD, MUSIC"
    body.append(h2)
    body.append(searchArtist)

    // const searchArtist = document.createElement("form");
    // searchArtist.setAttribute("id", "search-artist");
    // body.append(searchArtist);
    // const artistName = document.createElement("input");
    // artistName.setAttribute("type", "text");
    // artistName.setAttribute("value", "")
    // document.getElementById("search-artist").appendChild(artistName);
    // create a button
});


// search-artist form - artist name from user input
searchArtist.addEventListener('submit', function(e) {
    // prevent page refresh between searches
    e.preventDefault();
    const artist = searchArtist.querySelector("input[type='text']").value;
    console.log(artist)

    // getArtist(artist);
})


const searchArtist = (query = 'curry') => {
  fetch(`/api?searchTerm=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}

/* 
Before Refactor:

const searchArtist = (query = 'curry') => { 
  fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}
*/