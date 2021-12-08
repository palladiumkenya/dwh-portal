import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAdverseEventsSeverityActions = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsSeverityActions.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'advEv') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsSeverityActions());
    }
};

export const fetchAdverseEventsSeverityActions = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_SEVERITY_ACTIONS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getAeActionsBySeverity', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_SEVERITY_ACTIONS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
