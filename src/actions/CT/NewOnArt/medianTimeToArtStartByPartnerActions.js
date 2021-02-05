import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadMedianTimeToArtStartByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().medianTimeToArtStartByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txNew') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchMedianTimeToArtStartByPartner());
    }
};

export const fetchMedianTimeToArtStartByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_ART_START_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/medianTimeToArtByPartner', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_ART_START_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
    }
};
