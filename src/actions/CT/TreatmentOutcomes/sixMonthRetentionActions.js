import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadSixMonthRetention = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().sixMonthRetention.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'tOut' && tab !== 'tOut') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchSixMonthRetention());
    }
};

export const fetchSixMonthRetention = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_SIX_MONTH_RETENTION_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/treatmentOutcomesRetention6m', params);
    dispatch({ type: actionTypes.CT_SIX_MONTH_RETENTION_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
