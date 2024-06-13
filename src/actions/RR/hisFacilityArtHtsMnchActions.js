import moment from 'moment';
import { CACHING, PAGES } from '../../constants';
import * as actionTypes from '../types';
import { getAll } from '../../views/Shared/Api';

export const loadHisFacilityArtHtsMnchAction = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().hisFacilityArtHtsMnch.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.rr) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchHisFacilityTxcurr());
    }
}

export const fetchHisFacilityTxcurr = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HIS_FACILITY_ART_HTS_MNCH_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
    };
    const response = await getAll('common/facilityArtHtsMnch', params);
    dispatch({ type: actionTypes.HIS_FACILITY_ART_HTS_MNCH_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
