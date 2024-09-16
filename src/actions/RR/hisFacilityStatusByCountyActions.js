import moment from 'moment';
import { CACHING, PAGES } from '../../constants';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';

export const loadHisFacilityStatusByCountyAction = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().hisFacilityStatusByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.rr) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchHisFacilityStatusByPartner());
    }
}

export const fetchHisFacilityStatusByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HIS_FACILITY_STATUS_BY_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
    };
    const response = await getAll('common/facilityStatusByCounty', params);
    dispatch({ type: actionTypes.HIS_FACILITY_STATUS_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
