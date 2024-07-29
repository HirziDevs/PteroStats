module.exports = function convertUnits(value1, value2, unit) {
    unit = unit.toUpperCase();
    const units = ['MB', 'GB', 'TB'];
    const conversionFactors = {
        'MB': 1,
        'GB': 1 / 1024,
        'TB': 1 / (1024 * 1024)
    };

    if (unit === '%' || unit === "PERCENTAGE" || unit === "PERCENT") {
        const percentage = Math.floor((value1 / value2) * 100);
        return `${!percentage ? 0 : percentage}%`;
    } else if (units.includes(unit)) {
        const formatValue = (value) => Number.isInteger(value) ? value.toLocaleString() : value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
        return `${formatValue(value1 * conversionFactors[unit])} ${unit}/${(value2 === 0 || value2 < 1) ? "Unlimited" : formatValue(value2 * conversionFactors[unit]) + " " + unit}`;
    } else {
        return `${value1.toLocaleString()} MB/${value2.toLocaleString()} MB`;
    }
}