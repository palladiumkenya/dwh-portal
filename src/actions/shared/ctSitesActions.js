import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadCtSites = () => async (dispatch, getState) => {
    const lastFetch = getState().ctSites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchCtSites());
};

export const fetchCtSites = () => async dispatch => {
    dispatch({ type: actionTypes.CT_SITES_REQUEST });
    const response = await getAll('care-treatment/sites', []);
    if (response.length) {
        dispatch({ type: actionTypes.CT_SITES_FETCH, payload: response });
    }
};
