import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationNewByPartner = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtOptimizationNewByPartner());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationNewByPartner.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== 'txOpt') {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchArtOptimizationNewByPartner());
        }
    }
};

export const fetchArtOptimizationNewByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_REQUEST });
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
        year: [2020, 2021]
    };
    const response = await getAll('care-treatment/getArtOptimizationNewByPartner', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
