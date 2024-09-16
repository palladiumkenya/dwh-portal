import moment from 'moment';
import { CACHING, PAGES } from '../../constants';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';

export const loadHisFacilityByInfrastructureCountyActions = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().hisFacilityByInfrastructureCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.rr) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchHisFacilityByInfrastructure());
    }
}

export const fetchHisFacilityByInfrastructure = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HIS_FACILITY_BY_INFRASTRUCTURE_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('common/facilityByInfrastructureCounty', params);
    dispatch({ type: actionTypes.HIS_FACILITY_BY_INFRASTRUCTURE_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
