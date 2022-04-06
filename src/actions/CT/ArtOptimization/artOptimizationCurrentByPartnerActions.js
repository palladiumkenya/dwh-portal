import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationCurrentByPartner = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtOptimizationCurrentByPartner());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationCurrentByPartner.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== "artOptimization" &&
            tab !== "artOptimization") {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchArtOptimizationCurrentByPartner());
        }
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
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
    };
    const response = await getAll('care-treatment/getArtOptimizationCurrentByPartner', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
