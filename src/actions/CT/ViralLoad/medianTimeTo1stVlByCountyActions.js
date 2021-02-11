import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadMedianTimeTo1stVlByCounty = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().medianTimeTo1stVlByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchMedianTimeTo1stVlByCounty());
    }
};

export const fetchMedianTimeTo1stVlByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_1ST_VL_BY_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/vlMedianTimeToFirstVlByCounty', params);
    dispatch({ type: actionTypes.CT_MEDIAN_TIME_TO_1ST_VL_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
