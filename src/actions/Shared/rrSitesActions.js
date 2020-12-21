import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadRrSites = () => async (dispatch, getState) => {
    const lastFetch = getState().rrSites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchRrSites());
};

export const fetchRrSites = () => async dispatch => {
    dispatch({ type: actionTypes.RR_SITES_REQUEST });
    const response = await getAll('common/sites', []);
    if (response.length) {
        dispatch({ type: actionTypes.RR_SITES_FETCH, payload: response });
    }
};
