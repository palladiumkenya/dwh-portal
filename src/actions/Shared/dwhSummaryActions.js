import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadDWHSummary = (docket, params) => async (dispatch, getState) => {
    const lastFetch = getState().ctSites.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchDWHSummary(docket, params));
};

export const fetchDWHSummary = (docket, params) => async dispatch => {
    dispatch({ type: actionTypes.CT_DWH_SUMMARY_REQUEST });
    const response = await getAll('manifests/facilitiesCount/' + docket, params);
    console.log(response);
    if (response) {
        dispatch({ type: actionTypes.CT_DWH_SUMMARY_FETCH, payload: response });
    }
};
