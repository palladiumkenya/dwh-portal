import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, ETL_DAY, PAGES } from '../../../constants';

export const loadNewOnARTPartnerFacilityDWH = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().newOnArtByFacilityDWH.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchNewOnARTByFacilityDWH());
    }
};

export const fetchNewOnARTByFacilityDWH = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DWH_NEW_ON_ART_BY_PARTNER_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : moment().subtract(2, 'month').add(ETL_DAY, 'days').format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") :  moment().subtract(2, 'month').add(ETL_DAY, 'days').format("MM"),
    };
    const response = await getAll('operational-his/getTxNewBySexDwh', params);
    dispatch({ type: actionTypes.DWH_NEW_ON_ART_BY_PARTNER_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
