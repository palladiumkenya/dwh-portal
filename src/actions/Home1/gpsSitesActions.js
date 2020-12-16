import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadGpsSites = () => async (dispatch, getState) => {
    const lastFetch = getState().gpsSites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.MID) return;
    await dispatch(fetchGpsSites());
};

export const fetchGpsSites = () => async dispatch => {
    dispatch({ type: actionTypes.GPS_SITES_REQUEST });
    const response = await getAll('care-treatment/siteGps', []);
    if (response.length) {
        dispatch({ type: actionTypes.GPS_SITES_FETCH, payload: response });
    }
};
