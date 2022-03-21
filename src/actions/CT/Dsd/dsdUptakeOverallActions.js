import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadDsdUptakeOverall = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdUptakeOverall.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd' && getState().ui.currentPage !== PAGES.home && tab !== 'dsd') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdUptakeOverall());
    }
}

export const fetchDsdUptakeOverall = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_UPTAKE_OVERALL_REQUEST });
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
    const response = await getAll('care-treatment/dsdMmdUptakeOverall', params);
    dispatch({ type: actionTypes.CT_DSD_UPTAKE_OVERALL_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
}
