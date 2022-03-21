import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import moment from 'moment';
import { CACHING } from '../../../constants';

export const loadRegimenDistributionByWeightBands = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchRegimenDistributionByWeightBands());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationRegimenDistributionByWeightBands.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== "artOptimization" &&
            tab !== "artOptimization") {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchRegimenDistributionByWeightBands());
        }
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
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
    };
    const response = await getAll('care-treatment/getRegimenDistributionByWeightBands', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REGIMEN_DISTRIBUTION_BY_WEIGHT_BANDS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
}
