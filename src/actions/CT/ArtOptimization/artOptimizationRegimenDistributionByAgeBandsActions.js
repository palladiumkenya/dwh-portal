import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import moment from 'moment';
import { CACHING } from '../../../constants';

export const loadRegimenDistributionByAgeBands = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().artOptimizationRegimenDistributionByAgeBands.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txOpt') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchRegimenDistributionByAgeBands());
    }
};

export const fetchRegimenDistributionByAgeBands = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REGIMEN_DISTRIBUTION_BY_AGE_BANDS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
    };
    const response = await getAll('care-treatment/getRegimenDistributionByAgeBands', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REGIMEN_DISTRIBUTION_BY_AGE_BANDS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
}
