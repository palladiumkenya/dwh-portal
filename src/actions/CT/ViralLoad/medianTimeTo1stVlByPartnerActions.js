import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadMedianTimeTo1stVlByPartner = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().medianTimeTo1stVlByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchMedianTimeTo1stVlByPartner());
    }
};

export const fetchMedianTimeTo1stVlByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_1ST_VL_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/vlMedianTimeToFirstVlByPartner', params);
    dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_1ST_VL_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
