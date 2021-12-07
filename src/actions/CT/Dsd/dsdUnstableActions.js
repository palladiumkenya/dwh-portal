import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadDsdUnstable = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdUnstable.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdUnstable());
    }
};

export const fetchDsdUnstable = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_UNSTABLE_REQUEST });
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
    const response = await getAll('care-treatment/dsdUnstable', params);
    dispatch({ type: actionTypes.CT_DSD_UNSTABLE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
