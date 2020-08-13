import axios from 'axios';
let url = 'https://data.kenyahmis.org:8000';
let auth = '@%BWaie(IqTNH(alrtgk6YZrj(^s(gD7NeO0N!tTBW9aEvwjt$UmaaBetMcL';

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${url}${endpoint}`, {
            headers: { 'Authorization': auth }
        });
    if (params) {
        request = axios.get(`${url}${endpoint}`,{
            params: params,
            headers: { 'Authorization': auth }
        });
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
