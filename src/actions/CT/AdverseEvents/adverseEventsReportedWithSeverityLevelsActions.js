import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAdverseEventsReportedWithSeverityLevels = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsReportedWithSeverityLevels.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'advEv' && tab !== 'advEv') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsReportedWithSeverityLevels());
    }
};

export const fetchAdverseEventsReportedWithSeverityLevels = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_REPORTED_WITH_SEVERITY_LEVELS_REQUEST });
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
    const response = await getAll('care-treatment/getReportedAesWithSeverityLevels', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_REPORTED_WITH_SEVERITY_LEVELS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
