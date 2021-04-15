import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationCurrentByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().artOptimizationCurrentByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txOpt') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchArtOptimizationCurrentByPartner());
    }
};

export const fetchArtOptimizationCurrentByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll('care-treatment/getArtOptimizationCurrentByPartner', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
