import moment from 'moment';
import { CACHING, PAGES } from '../../constants';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';

export const loadHisFacilityStatusAction = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().hisFacilityStatus.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.rr) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchHisFacilityStatus());
    }
}

export const fetchHisFacilityStatus = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HIS_FACILITY_STATUS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('common/facilityStatus', params);
    dispatch({ type: actionTypes.HIS_FACILITY_STATUS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
