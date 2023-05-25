import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadIITTracing = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().IITTracing.lastFetch),
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
    dispatch({ type: actionTypes.CT_IIT_TRACING_REQUEST });
    const previousMonth = moment().startOf('month').subtract(2, 'month').add(17, 'days');
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
    const response = await getAll('care-treatment/getIITTracing', params);
    dispatch({
        type: actionTypes.CT_IIT_TRACING_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
