module.exports = function UptimeFormatter(time) {
    let text = []
    const days = Math.floor(time / 86400000);
    const hours = Math.floor(time / 3600000) % 24;
    const minutes = Math.floor(time / 60000) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    if (days > 0) text.push(`${days} days`)
    if (hours > 0) text.push(`${hours} hours`)
    if (minutes > 0) text.push(`${minutes} minutes`)
    if (text.length > 0) text.push(`and ${seconds} seconds`)
    else text.push(`${seconds} seconds`)
    return text.join(", ").replace(", and", " and")
}