import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadOutcomesHvlByFacility = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchViralLoadOutcomesHvlByFacility());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().viralLoadOutcomesHvlByFacility.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== 'vl' &&
            tab !== 'vl') {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchViralLoadOutcomesHvlByFacility());
        }
    }
};

export const fetchViralLoadOutcomesHvlByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OUTCOMES_HVL_BY_FACILITY_REQUEST });
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
    const response = await getAll('care-treatment/getVlOutcomesHvlByFacility', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OUTCOMES_HVL_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
