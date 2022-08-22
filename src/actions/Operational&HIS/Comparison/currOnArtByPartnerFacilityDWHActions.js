import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrOnARTPartnerFacilityDWH = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currOnArtByFacilityDWH.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrOnARTByFacilityDWH());
    }
};

export const fetchCurrOnARTByFacilityDWH = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DWH_CURR_ON_ART_BY_PARTNER_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : moment().subtract(2, 'month').add(15, 'days').format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") :  moment().subtract(2, 'month').add(15, 'days').format("MM"),
    };
    const response = await getAll('operational-his/getTxCurrBySexDwh', params);
    dispatch({ type: actionTypes.DWH_CURR_ON_ART_BY_PARTNER_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
