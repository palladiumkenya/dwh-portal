import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationNewByYear = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().artOptimizationNewByYear.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txOpt') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchArtOptimizationNewByYear());
    }
};

export const fetchArtOptimizationNewByYear = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_YEAR_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: [2020, 2021]
    };
    const response = await getAll('care-treatment/getArtOptimizationNewByYear', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_YEAR_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
    }
};
