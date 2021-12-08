import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadMissingDiagnosisDateByFacility = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchMissingDiagnosisDateByFacility());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().missingDiagnosisDateByFacility.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== 'txNew') {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchMissingDiagnosisDateByFacility());
        }
    }
};

export const fetchMissingDiagnosisDateByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_MISSING_DIAGNOSIS_DATE_BY_FACILITY_REQUEST });
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
    const response = await getAll('care-treatment/missingDiagnosisDateByFacility', params);
    dispatch({ type: actionTypes.CT_MISSING_DIAGNOSIS_DATE_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
