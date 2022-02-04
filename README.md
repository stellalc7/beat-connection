### Overview
BEAT C♡NNECTI♡N is an interactive site for data exploration built with JavaScript. Search cities, and listen to streams around the world. You'll also find the local top headline, weather, and time wherever you decide to go.

Behold our beat connections <a href="https://beatconnection.herokuapp.com" target="_blank">here</a>.

<p align='center'>
  <img width="700" alt="Screenshot 2022-02-03 at 01 41 42" src="https://user-images.githubusercontent.com/17345270/152293814-fe013df6-ab65-4f9f-b51f-3cad8f18b038.png">
  <img width="700" alt="Screenshot 2022-02-03 at 14 54 59" src="https://user-images.githubusercontent.com/17345270/152457026-71e8519e-5bf4-4db0-84ea-58210f2e6880.png">

</p>

### Technologies
- NodeJS
- ExpressJS
- Globe.GL
- Mixcloud API
- OpenWeatherMap API
- News API
- HTML / SCSS

### Functionalities
Users are invited to search a city, and the `Mixcloud API` fetches a stream connected to that city. An iframe is rendered on the page, so users can listen on-site.
```js
searchCity.addEventListener('submit', async function(e) {
  e.preventDefault();
  let city = searchCity.querySelector("input[type='text']").value.split(' ').join('%20');
  const urlStart = 'https://api.mixcloud.com/search';
  const url = `${urlStart}/?q=${city}&type=cloudcast`;
  const widgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=`
  fetch(url)
    .then(response => response.json())
    .then(stream =>
      iframe.src = widgetUrl + stream.stream[Math.floor(Math.random()*stream.stream.length)].url.slice(24),
      body.append(iframe)
      // refresh the stream for the new city
    )
}
```

The `News API` ingests a 2-letter country code from the data returned by the `OpenWeatherMap API` to search for top news in the country for the city the user queries. The first headline is taken from the API response, which is sorted by popularity of source.
```js
// FRONTEND
headline = await fetch(`/news?country=${encodeURIComponent(wxData.sys.country)}`)
            .then(res => res.json())
            .then(goodNews => { return goodNews })
            // receive good news from backend
            .catch(error => console.log(error))

if (headline.articles.length === 0) {
  headline = 'NO NEWS IS GOOD NEWS. \n 🙂🙂🙂🙂🙂🙂🙂🙂🙂🙂'
  // if there's no news, we still report good news
} else {
  // ...
}

// BACKEND
app.get('/news', (request, response) => {
  const newsApiKey = process.env.NEWS_API_KEY;
  const newsUrlStart = 'https://newsapi.org/v2/top-headlines?country'
  let country = request.query.country;
  let newsUrl = `${newsUrlStart}=${country}&sortBy=popularity&apiKey=${newsApiKey}`;
  fetch(newsUrl)
    .then(apiResponse => apiResponse.json())
    .then(goodNews => response.send(goodNews))
    // send good news to frontend
    .catch(error => response.send(error));
});
```

<!--
### Sources
https://globe.gl/<br>
https://www.mixcloud.com/developers/#connections-lists<br>
https://www.mixcloud.com/developers/widget/#methods<br>
https://developer.spotify.com/console/get-search-item/<br>
https://developer.spotify.com/console/get-artist-related-artists/<br>
-->

<!--
### Not not bugs
 <a href="https://ci.italy.tx.us/" target="_blank">Italy, TX, USA</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 22 59 56" src="https://user-images.githubusercontent.com/17345270/152279240-f0491aa7-9c9d-4747-9ac0-8e6aa51096b4.png"><br><br>
<a href="https://en.wikipedia.org/wiki/Korea,_Gmina_Telatyn" target="_blank">Korea, Lublin Voivodeship, Poland</a>.<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 06 18" src="https://user-images.githubusercontent.com/17345270/152279570-608c4e6f-69d7-4a12-ad2c-ce2cd553cfdc.png"><br><br>
In conclusion, if a city name does not coexist with that of a country's, the country will be mapped. Antithetically, if there is a city and a country with the same name, expect dissonace between the fetched stream and plotted location, as the city will be mapped by default. If there are multiple cities with the same name (e.g. Versailles), the one everyone's probably thinking of will be mapped. If a city simply has an idiosyncratic name, that city will simply be mapped. Even if it's a ghost town. <a href="http://www.texasescapes.com/CentralTexasTownsNorth/Okay-Texas.htm" target="_blank">Okay</a>?<br>
<img width="600" alt="Screenshot 2022-02-02 at 23 58 24" src="https://user-images.githubusercontent.com/17345270/152283908-9f92e537-dbc1-40ea-a4e6-d05411d61add.png">
-->

<!-- - Click on the globe, instead of search (what if user accidentally clicks)? Both?
- Globe zoom proportionally adjusts stream volume.
- Stream autoplay.
- themes
- Local time updates automatically.
- Top local news.
- Smoother loading / setTimeout?
- addEventListener for mouse movement if no mouse activity for X time, hide everything but the globe and local info (for projections).
- changeLanguage(city) => { }
-->

### My top Mixcloud streams
- DJ Set <a href="https://www.mixcloud.com/FrankMaster/special-dj-set-marrakesh-marocco-by-frank-master-stefano-capasso/" target="_blank">Marrakesh</a>
- Cooking with Palm Trax <a href="https://www.mixcloud.com/BCR_Radio/cooking-with-palms-trax-020/" target="_blank">Berlin</a>
- Future sound of Egypt <a href="https://www.mixcloud.com/alyfila-futuresoundofegypt/future-sound-of-egypt-650-live-from-cairo-with-aly-fila/" target="_blank">Cairo</a>
