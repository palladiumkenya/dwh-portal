export function roundNumber(number, decimalPlaces = 0) {
    return Number(number).toFixed(decimalPlaces);
}

export function formatNumber(number) {
    if (typeof number === 'undefined') {
        return 0;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}