'use strict';
console.log('image finder server is connected!!!');

//REQUIRES
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;


app.get('/', (request, response) => {
  response.status(200).send('Hello from our photo server');
});

app.get('/photos', async (req, res, next)=> {

  try {
    let searchQueryFromTheFrontEnd = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromTheFrontEnd}&format=json`;
    let results = await axios.get(url);
    let constructorData = results.data.results.map((picture) => new Photos(picture));
    res.status(200).send(constructorData);
  } catch (error) {
    next(error);
  }

});

app.get('*', (req, res) => {
  res.status(404).send('These are not the droids your looking 404.');
});

class Photos{
  constructor(photoObject){
    this.src = photoObject.urls.regular;
    this.alt = photoObject.alt_description;
    this.artist = photoObject.user.name;

  }
}
app.use((error, req, res) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));
