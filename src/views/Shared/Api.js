import axios from 'axios';
import moment from 'moment';

let url = null;
let url_identity = null;


if(process.env) {
    url = process.env.REACT_APP_ENDPOINT;
    url_identity = process.env.REACT_APP_IDENTITY_URL
} else {
    url = 'https://prod.kenyahmis.org:8082/api/';
    url_identity = 'https://auth.kenyahmis.org/DwhIdentity/api/';
}

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${url}${endpoint}`);
    if (params) {
        request = axios.get(`${url}${endpoint}`,{ params: params });
    }
    try {
        const response = await request;
        return response.data;
    } catch (e) {
        console.error(e);
    }
    return [];
};

export const getIdentityAll = async (endpoint, params) => {
    let request = axios.get(`${url_identity}${endpoint}`);
    if (params) {
        request = axios.get(`${url_identity}${endpoint}`,{ params: params });
    }
    try {
        const response = await request;
        const result = response.data;
        return result;
    } catch (e) {
        console.error(e);
    }
    return [];
}

export const createUpdateOrganizations = async (endpoint, id, name, code) => {
    let req = axios.post(`${url_identity}${endpoint}`, {
        id: id,
        Name: name,
        Code: code
    });

    try {
        const response = await req;
        const result = response.data;
        return result;
    } catch (e) {
        console.error(e);
    }
}

export const deleteOrganizations = async (endpoint, id) => {
    let request = axios.delete(`${url_identity}${endpoint}/${id}`);
    try {
        const response = await request;
        const result = response.data;
        return result;
    } catch (e) {
        console.error(e);
    }
    return [];
}

export const getUserById = async (endpoint, token) => {
    try {
        let request = axios.get(`${url_identity}${endpoint}`, { headers: { 'Authorization': 'Bearer ' + token } });
        try {
            const response = await request;
            const result = response.data;
            return result;
        } catch (e) {
            console.error(e);
        }
        return [];
    } catch (e) {
        console.error(e);
    }
    return [];
}

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

export const getYears = (minYear) => {
    const years = [];
    const startDate = moment([minYear]);
    const endDate = moment();

    if (endDate.isAfter(startDate)) {
        while (endDate.isAfter(startDate)) {
            years.push({ value: endDate.format('YYYY'), display: endDate.format("YYYY")});
            endDate.subtract(1, 'year');
        }
    }

    return years;
};

export const getMonths = () => {
    return  {
        1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
        7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
    };
};

export const capitalize = toCapitalize => {
    return toCapitalize ?
        toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1).toLowerCase() :
        toCapitalize;
}
