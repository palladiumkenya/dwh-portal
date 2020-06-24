import axios from 'axios';
import moment from 'moment'

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
    const startDate = moment([minYear]);
    const endDate = moment();

    if (endDate.isAfter(startDate)) {
        while (endDate.isAfter(startDate)) {
            // yearMonths.push({ value: endDate.year() + "," + endDate.month(), display: endDate.format("MMMM, YYYY")});
            yearMonths.push({ value: endDate.format('YYYY,M'), display: endDate.format("MMMM, YYYY")});
            endDate.subtract(1, 'month');
        }
    }
    
    return yearMonths;
};
