const axios = require('axios')
const chalk = require('chalk')

const postStatus = require('./postStatus')

module.exports = async function checkStatus(client) {

    const nodes = []

    const panel = {
        id: 1,
        status: false,
        total_servers: -1,
        total_users: -1,
    }

    console.log(chalk.cyan('[PteroStats]') + chalk.green(' Getting nodes stats'))

    const panelStats = new Promise((resolve, reject) => {
        axios(client.config.panel.url + '/api/application/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + client.config.panel.key
            }
        }).then(usr => {
            axios(client.config.panel.url + '/api/application/servers', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + client.config.panel.key
                }
            }).then(async (ser) => {
                panel.total_users = usr.data.meta.pagination.total
                panel.total_servers = ser.data.meta.pagination.total
                panel.status = true

                resolve()
            })
        }).catch(async (err) => {
            if (err.response) {
                if (err.response.status === 403) {
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' Err! Invalid apikey'))
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' 1. Make sure the apikey is from admin page not account page'))
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' 2. Make sure the apikey has read permission on all options'))
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' 3. Make sure the apikey is exist'))
                } else if (err.response.status === 404) {
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' Err! Invalid URL Panel'))
                    console.log(chalk.cyan('[PteroStats]') + chalk.red(' 1. Make sure the panel url is like "https://panel.example.com"'))
                } else console.log(chalk.cyan('[PteroStats] ') + err)
            } else console.log(chalk.cyan('[PteroStats] ') + err)
            resolve()
        })
    })

    const nodeStats = new Promise((resolve, reject) => {
        axios(client.config.panel.url + '/api/application/nodes?include=servers,location,allocations', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + client.config.panel.key
            }
        }).then(async (res) => {
            res.data.data.forEach(async (node, i) => {
                axios(client.config.panel.url + '/api/application/nodes/' + node.attributes.id + '/configuration', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + client.config.panel.key
                    }
                }).then(async (data) => {
                    const body = {
                        id: node.attributes.id,
                        name: node.attributes.name,
                        location: node.attributes.relationships.location.attributes.short,
                        allocations: node.attributes.relationships.allocations.data.length,
                        status: true,
                        maintenance: node.attributes.maintenance_mode,
                        total_servers: node.attributes.relationships.servers.data.length,
                        memory_min: node.attributes.allocated_resources.memory,
                        memory_max: node.attributes.memory,
                        disk_min: node.attributes.allocated_resources.disk,
                        disk_max: node.attributes.disk,
                    }

                    const stats = new Promise((statsResolve, statsReject) => {
                        axios(node.attributes.scheme + '://' + node.attributes.fqdn + ':' + node.attributes.daemon_listen + '/api/servers', {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + data.data.token
                            }
                        }).then(async (status) => {
                            statsResolve()
                        }).catch(async (err) => {
                            body.status = false
                            statsResolve()
                        })
                    })
                    stats.then(() => {
                        nodes.push(body)
                        resolve()
                    })
                }).catch(async (err) => {
                    resolve()
                })
            })
        }).catch(async (err) => {
            resolve()
        })
    })

    panelStats.then(() => {
        nodeStats.then(() => {
            postStatus(client, panel, nodes)
        })
    })
}