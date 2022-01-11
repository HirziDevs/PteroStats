const axios = require('axios');

module.exports = async (client, url) => {
  let hosturl = client.config.panel.url;
  let adminAPIKey = client.config.panel.adminkey;

  if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
  let unapi = hosturl + '/api';
  let api = unapi.replace('//api', '/api');
  api = api + '/application';

  let response = await axios(api + url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + adminAPIKey
    }
  });

  let data = response.data.data;
  
  return data;
}