import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, DWH_API_URL } from '../../../constants';

export const loadUptakeBySex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().uptakeBySex.lastFetch),
        'minutes'
    );
    if (getState().ui.htsTab !== 'uptake') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchUptakeBySex());
    }
};

export const fetchUptakeBySex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HTS_UPTAKE_BY_SEX_REQUEST });
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
        const response = await axios.get(`${DWH_API_URL}hts/uptakeBySex`, { params: params });
        dispatch({ type: actionTypes.HTS_UPTAKE_BY_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response.data }});
    } catch (e) {
        dispatch({ type: actionTypes.HTS_UPTAKE_BY_SEX_REQUEST_FAILED });
    }
};
