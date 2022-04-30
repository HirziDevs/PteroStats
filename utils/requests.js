const axios = require('axios');

module.exports = {

async queryServers(url, key) {
    return new Promise((resolve, reject) => {
        axios(url + '/application/servers', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
})
},

async queryUsers(url, key) {
    return new Promise((resolve, reject) => {
        axios(url + '/application/users', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
})
},

async getNodes(url, key) {
    return new Promise((resolve, reject) => {
       axios(url + '/application/nodes/', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }
  }).then((res) => {
      resolve(res.data.data)
  }).catch((err) => {
      reject(err)
  })
})
},

async getAllocations(url, key, id) {
    return new Promise((resolve, reject) => {
        axios(url + '/application/nodes/' + id + '?include=servers,location,allocations', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }
  }).then((res) => {
      resolve(res)
  }).catch((err) => {
      reject(err)
  })
})
},

async getNodeConfig(url, key, id) {
    return new Promise((resolve, reject) => {
        axios(url + '/application/nodes/' + id + '/configuration', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }
  }).then((res) => {
      resolve(res)
  }).catch((err) => {
      reject(err)
  })
})
},

async getNodeStatus(scheme, fqdn, daemon_listen, token) {
    return new Promise((resolve, reject) => {
        axios(scheme + '://' + fqdn + ':' + daemon_listen + '/api/servers', { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
  }).then((res) => {
      resolve(res)
  }).catch((err) => {
      reject(err)
  })
})
},


}
