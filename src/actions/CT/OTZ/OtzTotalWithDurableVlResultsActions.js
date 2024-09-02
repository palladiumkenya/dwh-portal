import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzTotalWithDurableVLResults = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzTotalWithDurableVlResults.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzTotalWithDurableVLResults());
    }
}

export const fetchOtzTotalWithDurableVLResults = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_TOTAL_WITH_DURABLE_VL_RESULTS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups
    };
    const response = await getAll('care-treatment/getOtzTotalWithDurableVl', params);
    dispatch({ type: actionTypes.CT_OTZ_TOTAL_WITH_DURABLE_VL_RESULTS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
