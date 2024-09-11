const prettyBytes = require('prettier-bytes');

module.exports = function convertUnits(value1, value2, unit) {
    unit = unit.toUpperCase();
    switch (unit) {
        case 'PERCENTAGE':
        case 'PERCENT':
            const percentage = Math.floor((value1 / value2) * 100);
            return `${!percentage ? 0 : percentage}%`;
        case 'BYTE':
            return `${prettyBytes(value1 * 1000000)} / ${value2 === 0 ? "Unlimited" : prettyBytes(value2 * 1000000)}`;
        default:
            return `${value1.toLocaleString()} ${unit}/${value2 === 0 ? "Unlimited" : `${value2.toLocaleString()} ${unit}`}`;
    }
}