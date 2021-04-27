export function roundNumber(number, decimalPlaces = 0) {
    return Number(number).toFixed(decimalPlaces);
}

export function formatNumber(number) {
    if (!number) {
        return 0;
    } else if (typeof number === 'undefined') {
        return 0;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}