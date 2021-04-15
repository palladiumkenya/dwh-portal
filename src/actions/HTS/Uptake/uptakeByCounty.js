import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, PAGES, DWH_API_URL } from '../../../constants';

export const loadUptakeByCounty = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().uptakeByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.htsTab !== 'uptake' && getState().ui.currentPage !== PAGES.hrh) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchUptakeByCounty());
    }
};

export const fetchUptakeByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HTS_UPTAKE_BY_COUNTY_REQUEST });
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
        const response = await axios.get(`${DWH_API_URL}/api/hts/uptakeByCounty`, { params: params });
        dispatch({ type: actionTypes.HTS_UPTAKE_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response.data }});
    } catch (e) {
        dispatch({ type: actionTypes.HTS_UPTAKE_BY_COUNTY_REQUEST_FAILED });
    }
};
