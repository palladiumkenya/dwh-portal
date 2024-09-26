import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadAhdScreening = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().ahdScreening.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAhdScreening());
    }
}

export const fetchAhdScreening = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.AHD_SCREENING_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll('care-treatment/getAHDScreened', params);
    dispatch({ type: actionTypes.AHD_SCREENING_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
