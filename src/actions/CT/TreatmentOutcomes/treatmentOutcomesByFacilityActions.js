import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadTreatmentOutcomesByFacility = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().treatmentOutcomesByFacility.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'tOut' && tab !== 'tOut') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchTreatmentOutcomesByFacility());
    }
};

export const fetchTreatmentOutcomesByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_BY_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        fromDate: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY-MM-DD") : null,
        toDate: getState().filters.toDate ? moment(getState().filters.toDate, "MMM YYYY").format("YYYY-MM-DD") : null,
    };
    const response = await getAll('care-treatment/treatmentOutcomesByFacility', params);
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
