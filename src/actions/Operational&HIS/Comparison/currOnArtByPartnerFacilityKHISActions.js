import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';
import { KHIS_CURR_ON_ART_BY_PARTNER_FACILITY_REQUEST } from '../../types';

export const loadCurrOnARTPartnerFacilityKHIS = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currOnArtByFacilityKHIS.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrOnARTByFacilityKHIS());
    }
};

export const fetchCurrOnARTByFacilityKHIS = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_BY_PARTNER_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYYMM") : moment().format("YYYYMM"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('operational-his/getTxCurrBySex', params);
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_BY_PARTNER_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
