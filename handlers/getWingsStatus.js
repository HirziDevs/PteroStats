module.exports = async function getWingsStatus(node, nodeToken) {
    return fetch(`${node.attributes.scheme}://${node.attributes.fqdn}:${node.attributes.daemon_listen}/api/servers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${nodeToken}`
        },
    })
        .then((res) => res.json())
        .then(() => true)
        .catch(() => false)
}