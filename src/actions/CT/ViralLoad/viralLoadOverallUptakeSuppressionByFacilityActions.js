import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadOverallUptakeSuppressionByFacility = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadOverallUptakeSuppressionByFacility.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadOverallUptakeSuppressionByFacility());
    }
};

export const fetchViralLoadOverallUptakeSuppressionByFacility = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_SUPPRESSION_BY_FACILITY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/vlOverallUptakeAndSuppressionByFacility', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_SUPPRESSION_BY_FACILITY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
