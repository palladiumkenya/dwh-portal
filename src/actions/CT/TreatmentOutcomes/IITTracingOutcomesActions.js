import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadIITTracingOutcomes = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().IITTracingOutcomes.lastFetch),
        'minutes'
    );
    if (
        getState().ui.ctTab !== 'treatmentOutcomes' &&
        tab !== 'treatmentOutcomes'
    ) {
        return;
    } else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchIIT());
    }
};

export const fetchIIT = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_IIT_TRACING_OUTCOMES_REQUEST });
    const previousMonth = moment().subtract(2, 'month').add(17, 'days');
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : previousMonth.format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : previousMonth.format('MM'),
    };
    const response = await getAll(
        'care-treatment/getIITTracingOutcomes',
        params
    );
    dispatch({
        type: actionTypes.CT_IIT_TRACING_OUTCOMES_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
