import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, DWH_API_URL } from '../../../constants';

export const loadPrepDiscontinuation = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().prepDiscontinuation.lastFetch),
        'minutes'
    );
    if (getState().ui.htsTab !== 'prep') {
        
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchPrepDiscontinuation());
    }
};

export const fetchPrepDiscontinuation = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HTS_PREP_DISCONTINUATION_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : moment().subtract(2, 'month').add(17, 'days').format('MM'),
    };
    try {
        const response = await axios.get(
            `${DWH_API_URL}hts/getPrepDiscontinuation`,
            { params: params }
        );
        dispatch({
            type: actionTypes.HTS_PREP_DISCONTINUATION_FETCH,
            payload: {
                filtered: getState().filters.filtered,
                list: response.data,
            },
        });
    } catch (e) {
        dispatch({ type: actionTypes.HTS_PREP_DISCONTINUATION_FAILED });
    }
};
