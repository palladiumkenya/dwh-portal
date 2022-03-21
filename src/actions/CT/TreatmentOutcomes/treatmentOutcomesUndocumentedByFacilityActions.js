import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadTreatmentOutcomesUndocumentedByFacility = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchTreatmentOutcomesUndocumentedByFacility());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().treatmentOutcomesUndocumentedByFacility.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== "treatmentOutcomes" && tab !== "treatmentOutcomes") {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchTreatmentOutcomesUndocumentedByFacility());
        }
    }
};

export const fetchTreatmentOutcomesUndocumentedByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_UNDOCUMENTED_BY_FACILITY_REQUEST });
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
    const response = await getAll('care-treatment/treatmentOutcomesUndocumentedByFacility', params);
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_UNDOCUMENTED_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
