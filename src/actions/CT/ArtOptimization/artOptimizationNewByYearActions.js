import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadArtOptimizationNewByYear = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtOptimizationNewByYear());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationNewByYear.lastFetch),
            'minutes'
        );
        if (getState().ui.currentPage !== PAGES.ct) {
            return;
        } else if (
            diffInMinutes < CACHING.MID &&
            getState().filters.filtered === false
        ) {
            return;
        } else {
            await dispatch(fetchArtOptimizationNewByYear());
        }
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
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
        year: [2020, 2021, 2022, 2023]
    };
    const response = await getAll('care-treatment/getArtOptimizationNewByYear', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_YEAR_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
