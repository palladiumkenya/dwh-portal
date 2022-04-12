import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadOverallUptakeSuppressionBySexVlDone = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadOverallUptakeSuppressionBySexVlDone.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadOverallUptakeSuppressionBySexVlDone());
    }
};

export const fetchViralLoadOverallUptakeSuppressionBySexVlDone = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_SUPPRESSION_BY_SEX_VLDONE_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/vlOverallUptakeAndSuppressionLdl', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_SUPPRESSION_BY_SEX_VLDONE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
