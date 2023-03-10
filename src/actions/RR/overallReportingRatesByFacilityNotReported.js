import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../types';
import { CACHING, DWH_API_URL, PAGES } from '../../constants';

export const loadOverallReportingRatesByFacilityNotReported = () => async (dispatch, getState) => {
    const docket = getState().ui.rrTab;
    const lastFetch = getState().overallReportingRatesByFacilityNotReported.lastFetch[docket];
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (getState().ui.currentPage !== PAGES.rr) return;
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) return;
    await dispatch(fetchOverallReportingRatesByFacilityNotReported());
};

export const fetchOverallReportingRatesByFacilityNotReported = () => async (dispatch, getState) => {
    const docket = getState().ui.rrTab;
    dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_REQUEST, payload: { docket: docket }});
    let params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : moment().format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : moment().format('M'),
        reportingType: '0',
    };
    params.period = getState().filters.fromDate
        ? moment(getState().filters.fromDate, 'MMM YYYY')
              .startOf('month')
              .subtract(0, 'month')
              .format('YYYY,M')
        : moment()
              .startOf('month')
              .subtract(2, 'month')
              .add(16, 'days')
              .format('YYYY,M');
    try {
        const response = await axios.get(`${DWH_API_URL}manifests/overallReportingByFacility/${docket}`, { params: params });
        dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_FETCH, payload: { filtered: getState().filters.filtered, docket: docket, list: response.data }});
    } catch (e) {
        dispatch({ type: actionTypes.RR_OVERALL_REPORTING_RATES_BY_FACILITY_NOT_REPORTED_REQUEST_FAILED, payload: { docket: docket }});
    }
};
