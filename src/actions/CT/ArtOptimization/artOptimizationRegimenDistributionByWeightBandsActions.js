import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import moment from 'moment';
import { CACHING } from '../../../constants';

export const loadRegimenDistributionByWeightBands = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().artOptimizationRegimenDistributionByWeightBands.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txOpt') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchRegimenDistributionByWeightBands());
    }
};

export const fetchRegimenDistributionByWeightBands = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REGIMEN_DISTRIBUTION_BY_WEIGHT_BANDS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/getRegimenDistributionByWeightBands', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REGIMEN_DISTRIBUTION_BY_WEIGHT_BANDS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
}
