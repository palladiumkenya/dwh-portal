import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationOverview = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().artOptimizationOverview.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txOpt') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchArtOptimizationOverview());
    }
};

export const fetchArtOptimizationOverview = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_OVERVIEW_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/getArtOptimizationOverview', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_OVERVIEW_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
    }
};
