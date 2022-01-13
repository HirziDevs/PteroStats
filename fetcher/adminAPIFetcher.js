const axios = require('axios');

module.exports = async (client, url, strippingLevel) => {
  let hosturl = client.config.panel.url;
  let adminAPIKey = client.config.panel.adminkey;
  if(!strippingLevel){
    strippingLevel = 2
  }

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

  if(strippingLevel == 2){
    return response.data.data
  }else if(strippingLevel == 1){
    return response.data
  }else if(strippingLevel == 0){
    return response
  }
}