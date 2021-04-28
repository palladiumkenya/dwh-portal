import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../types';
import { CACHING, DWH_API_URL, PAGES } from '../../constants';

export const loadOverallReportingRatesByFacility = () => async (dispatch, getState) => {
    const docket = getState().ui.rrTab;
    const lastFetch = getState().overallReportingRatesByFacility.lastFetch[docket];
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (getState().ui.currentPage !== PAGES.rr) return;
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) return;
    await dispatch(fetchOverallReportingRatesByFacility());
};

export const fetchOverallReportingRatesByFacility = () => async (dispatch, getState) => {
    const docket = getState().ui.rrTab;
    dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_REQUEST, payload: { docket: docket }});
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
    try {
        const response = await axios.get(`${DWH_API_URL}/api/manifests/overallReportingByFacility/${docket}`, { params: params });
        dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, docket: docket, list: response.data }});
    } catch (e) {
        dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_REQUEST_FAILED, payload: { docket: docket }});
    }
};
