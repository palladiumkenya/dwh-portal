import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadOutcomesBySex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadOutcomesBySex.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadOutcomesBySex());
    }
};

export const fetchViralLoadOutcomesBySex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OUTCOMES_BY_SEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/vlOutcomesBySex', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OUTCOMES_BY_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
