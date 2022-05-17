const axios = require('axios');

module.exports = async (client, type, url, strippingLevel) => {
  let hosturl = client.config.panel.url;
  let adminAccountAPIKey = client.config.clientkey;
  let adminAPIKey = client.config.panel.adminkey;

  if(!strippingLevel){
    strippingLevel = 2
  }

  if (!hosturl.includes('http')) hosturl = 'http://' + hosturl;
  let unapi = hosturl + '/api';
  let api = unapi.replace('//api', '/api');

  let APIKey;

  if(type == "client"){
    api = api + '/client';
    APIKey = adminAccountAPIKey;
  }else{
    api = api + '/application'
    APIKey = adminAPIKey
  }

  let response = await axios(api + url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + APIKey
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