import moment from 'moment';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';
import { CACHING } from '../../constants';

export const loadGpsSites = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().gpsSites.lastFetch),
        'minutes'
    );
    if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchGpsSites());
    }
};

export const fetchGpsSites = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.GPS_SITES_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/siteGps', params);
    dispatch({ type: actionTypes.GPS_SITES_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
