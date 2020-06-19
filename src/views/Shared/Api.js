import axios from 'axios';

const url = 'http://localhost:7000/api/';

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${url}${endpoint}`);
    if (params) {
        request = axios.get(`${url}${endpoint}`,{ params: params });
    }
    try {
        const response = await request;
        const result = response.data;
        return result;
    } catch (e) {
        console.error(e);
    }
    return [];
};

export const getYearMonths = (minYear) => {
    const yearMonths = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const maxYear = new Date().getFullYear();

    for (let y = maxYear; y >= minYear; y--) {
        const maxMonth = y === maxYear ? new Date().getMonth() : 11;
        for (let m = maxMonth; m >= 0; m--) {
            yearMonths.push({ value: `${y},${m}`, display: `${monthNames[m]},${y}` });
        }
    }
    return yearMonths;
};
