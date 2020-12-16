import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadHtsSites = () => async (dispatch, getState) => {
    const lastFetch = getState().htsSites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchHtsSites());
};

export const fetchHtsSites = () => async dispatch => {
    dispatch({ type: actionTypes.HTS_SITES_REQUEST });
    const response = await getAll('hts/sites', []);
    if (response.length) {
        dispatch({ type: actionTypes.HTS_SITES_FETCH, payload: response });
    }
};
