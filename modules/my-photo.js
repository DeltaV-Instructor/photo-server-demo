const axios = require('axios');
const express = require('express');
const app = express();


let cache = {};
console.log('🚀 ~ file: my-photo.js:9 ~ cache', cache);


async function getPhotos(req, res, next){
  /**
   * the front end will send a value to use to search for photos
     Is the thing the user is requesting already in the cache?
     we use key value pairs to store things in our cache. and our key should match the search term
     so create a key so we can give a label to the thing we are putting in the cache.
*/
  try {
    let searchQueryFromTheFrontEnd = req.query.searchQuery;
    let key = searchQueryFromTheFrontEnd + '-Data';
    //how do we 'time' on our server
    //1000 milliseconds in a second: 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day and 30 days in a month.
    let acceptAbleTimeToCache = 1000 * 60 * 60 * 24 * 30;
    console.log('🚀 ~ file: my-photo.js:25 ~ getPhotos ~ acceptAbleTimeToCache', acceptAbleTimeToCache);
    //how long? 10 seconds
    let testTimeToCache = 1000 * 10;
    console.log('🚀 ~ file: my-photo.js:28 ~ getPhotos ~ testTimeToCache', testTimeToCache);
    if(cache[key] && Date.now() - cache[key].timeStamp < testTimeToCache){
      //if it is already in cache give them that data from the cache
      res.status(200).send(cache[key].data);
    } else {
      //let put the first one into the cache object for later retrieval
      console.log('not yet in the cache');
      let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQueryFromTheFrontEnd}&format=json`;

      let results = await axios.get(url);
      let constructorData = results.data.results.map((picture) => new Photos(picture));
      cache[key] ={
        data: constructorData,
        timeStamp: Date.now()
      };
      res.status(200).send(constructorData);
    }
  } catch (error) {
    next(error);
  }
}





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

module.export = getPhotos;
