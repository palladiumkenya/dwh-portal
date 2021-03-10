import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadDsdStableOverall = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdUnstable.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdStableOverall());
    }
}

export const fetchDsdStableOverall = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_STABLE_OVERALL_REQUEST });
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
    const response = await getAll('care-treatment/getDsdStableOverall', params);
    dispatch({ type: actionTypes.CT_DSD_STABLE_OVERALL_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
}
