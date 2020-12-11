import moment from 'moment';
import * as actionTypes from './types';
import { getAll } from '../views/Shared/Api';

export const loadSites = () => async (dispatch, getState) => {
    console.log('loading sites');
    const lastFetch = getState().sites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 10) return;
    await dispatch(fetchSites());
};

export const fetchSites = () => async dispatch => {
    console.log('fetching sites from api');
    dispatch({ type: actionTypes.SITES_REQUEST });
    const response = await getAll('care-treatment/sites', []);
    dispatch({ type: actionTypes.SITES_FETCH, payload: response });
};
