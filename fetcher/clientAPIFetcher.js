const axios = require('axios');

module.exports = async (client, url) => {
  let hosturl = client.config.panel.url;
  let adminAccountAPIKey = client.config.adminAccountAPIKey;

  if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
  let unapi = hosturl + '/api';
  let api = unapi.replace('//api', '/api');
  api = api + '/client';

  let response = await axios(api + url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + adminAccountAPIKey
    }
  });

  let data = response.data;
  
  return data;
}