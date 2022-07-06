import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrOnARTKHISByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currOnArtKHISByPartner.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrOnARTKHISByPartner());
    }
};

export const fetchCurrOnARTKHISByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('operational-his/getTxCurrKHISPartner', params);
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
