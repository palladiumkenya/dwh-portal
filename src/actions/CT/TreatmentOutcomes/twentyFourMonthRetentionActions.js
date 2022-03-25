import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadTwentyFourMonthRetention = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().twentyFourMonthRetention.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== "treatmentOutcomes" && tab !== "treatmentOutcomes") {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchTwentyFourMonthRetention());
    }
};

export const fetchTwentyFourMonthRetention = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TWENTY_FOUR_MONTH_RETENTION_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll('care-treatment/treatmentOutcomesRetention24m', params);
    dispatch({ type: actionTypes.CT_TWENTY_FOUR_MONTH_RETENTION_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
