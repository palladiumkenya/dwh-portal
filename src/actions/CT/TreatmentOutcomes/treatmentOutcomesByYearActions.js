import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadTreatmentOutcomesByYear = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().treatmentOutcomesByYear.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'tOut' && tab !== 'tOut') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchTreatmentOutcomesByYear());
    }
};

export const fetchTreatmentOutcomesByYear = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_BY_YEAR_REQUEST });
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
    const response = await getAll('care-treatment/treatmentOutcomesByYear', params);
    dispatch({ type: actionTypes.CT_TREATMENT_OUTCOMES_BY_YEAR_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
