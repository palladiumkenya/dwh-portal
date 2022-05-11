import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadSuppressionByYear = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadSuppressionByYear.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadSuppressionByYear());
    }
};

export const fetchViralLoadSuppressionByYear = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_SUPPRESSION_BY_YEAR_REQUEST });
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
    const response = await getAll('care-treatment/vlSuppressionByYear', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_SUPPRESSION_BY_YEAR_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
