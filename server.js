'use strict';
console.log('image finder server is connected!!!');

/**
================= Servers ====================
A server needs to respond to information on the internet
When information is sent on the internet it primarily uses http
http is a way to encode data and send it in a uniform way so everyone can talk. Its like the alphabet of talking on the internet

The job of talking over http, and especially listening for http requests is handled by Express It gets translated by express into javascript

http requests contain a lot of info {huge object header body}
The basics are a lot like mail
there is an address: url
there is a to and a from  to: route, from: client url
There can be a letter inside: encode information completely hidden in the body the data lives
the response - like a letter in the envelope
There can be info written on the outside of the letter - this is our queries
- info on the visible url

Express() reads all of this for us and much more


================ Environment  ===============
A server has to run somewhere
Heroku, AWS, terminal, render
The server needs to run on a PORT on our local we use 3000, 3002,
heroku tends to gravitate towards like 27000-32000, aws i have no clue
There are settings our server has to pay attention to when it runs.
We will create dynamic variables instead of hard coded ones that our server can read live.
These variables make up / live in our environment
not goDaddy (goDaddy is a DNS, redirects to where it lives)
*/

//REQUIRES
const express = require('express');
const cors = require('cors');
//Cross origin Resource sharing: allows connection between 2 local servers or websites: it can block or allow access to any list of urls. By default it allows localhost to talk to itself
require('dotenv').config();
const axios = require('axios');

//USE
//app === server
const app = express();
//create a server from the express library
app.use(cors());
//app.use() loads middlewear - we are loading cors so that requests, dont get blocked when they are local.
const PORT = process.env.PORT || 5005;


//ROUTES


//CLASSES


//ERRORS

//START SERVER LISTENING
//server.method(1st, 2nd log out port);
//causes server to run and listen for when a route is hit.
app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));
