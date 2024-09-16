const prettyBytes = require('prettier-bytes');

module.exports = function convertUnits(value, max, unit) {
    unit = unit.toUpperCase();
    switch (unit) {
        case 'PERCENTAGE':
        case 'PERCENT':
            const percentage = Math.floor((value / max) * 100);
            return `${!percentage ? 0 : percentage}%`;
        case 'BYTE':
            return `${prettyBytes(value * 1000000)} / ${max === 0 ? "Unlimited" : prettyBytes(max * 1000000)}`;
        default:
            return `${value.toLocaleString()} ${unit}/${max === 0 ? "Unlimited" : `${max.toLocaleString()} ${unit}`}`;
    }
}