import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, HRH_API_URL } from '../../../constants';

export const loadPractitionersCountByCountyQualification = () => async (dispatch, getState) => {
    const lastFetch = getState().practitionersCountByCountyQualification.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchPractitionersCountByCountyQualification());
};

export const fetchPractitionersCountByCountyQualification = () => async dispatch => {
    dispatch({ type: actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_REQUEST });
    try {
        const response = await axios.get(`${HRH_API_URL}/practitioners/count-by-county-qualification`);
        dispatch({ type: actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_FETCH, payload: response.data.data });
    } catch (e) {
        dispatch({ type: actionTypes.HRH_PRACTITIONERS_COUNT_BY_COUNTY_QUALIFICATION_REQUEST_FAILED });
    }
};
