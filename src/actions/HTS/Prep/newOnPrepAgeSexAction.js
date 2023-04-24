import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, DWH_API_URL } from '../../../constants';

export const loadNewOnPrepAgeSex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().newOnPrepAgeSex.lastFetch),
        'minutes'
    );
    if (getState().ui.htsTab !== 'prep') {
        
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCTPrep());
    }
};

export const fetchCTPrep = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.PREP_NEW_AGESEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : moment().subtract(2, 'month').add(17, 'days').format('MM'),
    };
    try {
        const response = await axios.get(
            `${DWH_API_URL}hts/getNewOnPrepByAgeSex`,
            {
                params: params,
            }
        );
        dispatch({ type: actionTypes.PREP_NEW_AGESEX_FETCH, payload: { filtered: getState().filters.filtered, list: response.data }});
    } catch (e) {
        dispatch({ type: actionTypes.PREP_NEW_AGESEX_FAILED });
    }
};
