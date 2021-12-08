import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadDsdStabilityStatusByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdStabilityStatusByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd' && getState().ui.currentPage !== PAGES.home) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdStabilityStatusByPartner());
    }
};

export const fetchDsdStabilityStatusByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_STABILITY_STATUS_BY_PARTNER_REQUEST });
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
    const response = await getAll('care-treatment/dsdStabilityStatusByPartner', params);
    dispatch({ type: actionTypes.CT_DSD_STABILITY_STATUS_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
