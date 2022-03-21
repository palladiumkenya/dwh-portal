import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadDsdStabilityStatusByAgeSex = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdStabilityStatusByAgeSex.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd' && tab !== 'dsd' && getState().ui.currentPage !== PAGES.home) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdStabilityStatusByAgeSex());
    }
};

export const fetchDsdStabilityStatusByAgeSex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_STABILITY_STATUS_BY_AGE_SEX_REQUEST });
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
    const response = await getAll('care-treatment/dsdStabilityStatusByAgeSex', params);
    dispatch({ type: actionTypes.CT_DSD_STABILITY_STATUS_BY_AGE_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
