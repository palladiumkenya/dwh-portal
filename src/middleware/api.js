import axios from 'axios';
import * as apiActions from '../actions/apiActions';

const api = ({ dispatch }) => (next) => async (action) => {
    if (action.type !== apiActions.apiStart.type) {
        return next(action);
    }

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) {
        dispatch({ type: onStart });
    }

    next(action);

    try {
        const response = await axios.request({
            baseURL: process.env.NODE_ENV.trim() === 'production' ? 'https://data.kenyahmis.org:8082/api/' : 'http://localhost:7000/api/',
            url,
            method,
            data,
        });
        dispatch(apiActions.apiSuccess(response.data));
        if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data });
        }
    } catch (error) {
        dispatch(apiActions.apiError(error.message));
        if (onError) {
            dispatch({ type: onError, payload: error.message });
        }
    }
};

export default api;
