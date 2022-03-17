import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAdverseEventsActionsByDrugsNew = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().adverseEventsActionsByDrugsNew.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'advEv' && tab !== 'advEv') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAdverseEventsActionsByDrugsNew());
    }
};

export const fetchAdverseEventsActionsByDrugsNew = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_ACTIONS_BY_DRUGS_NEW_REQUEST });
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
    const response = await getAll('care-treatment/getAeActionsByDrugsNew', params);
    dispatch({ type: actionTypes.CT_ADVERSE_EVENTS_ACTIONS_BY_DRUGS_NEW_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
