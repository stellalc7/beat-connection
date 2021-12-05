const axios = require('axios');
const qs = require('qs');

// import axios from  'axios';
// import qs from 'qs';

require('dotenv').config();

var client_id = '5f54c2557fd24e00820a6401cf913dff';
var client_secret = '646f17419ce74ed2bcdfa7bdf836a606'; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
  try{
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({'grant_type':'client_credentials'});

    const response = await axios.post(token_url, data, {
      headers: { 
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    //return access token
    return response.data.access_token;
    //console.log(response.data.access_token);   
  }catch(error){
    //on fail, log the error in console
    console.log(error);
  }
}

module.exports.getAuth = getAuth;