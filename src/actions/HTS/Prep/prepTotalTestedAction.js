import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, DWH_API_URL } from '../../../constants';

export const loadPrepTotalTested = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().prepTotalTested.lastFetch),
        'minutes'
    );
    if (getState().ui.htsTab !== 'prep') {
        return;
    } else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchCTPrep());
    }
};

export const fetchCTPrep = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.PREP_TESTED_TOTAL_REQUEST });
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
        const response = await axios.get(
            `${DWH_API_URL}hts/getprepTotalTested`,
            {
                params: params,
            }
        );
        dispatch({
            type: actionTypes.PREP_TESTED_TOTAL_FETCH,
            payload: {
                filtered: getState().filters.filtered,
                list: response.data,
            },
        });
    } catch (e) {
        dispatch({ type: actionTypes.PREP_TESTED_TOTAL_FAILED });
    }
};
