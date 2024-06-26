import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

import {
    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTests
} from './viralLoadOverallUptakeGt1000CopiesReceivedFollowTests';


export const loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadOverallUptakeGt1000CopiesReceivedFollowTestsAll.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadOverallUptakeGt1000Copies());
    }
};

export const fetchViralLoadOverallUptakeGt1000Copies = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_GT_1000_COPIES_RECEIVED_FOLLOW_TESTS_ALL_REQUEST });
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
    const response = await getAll('care-treatment/getVlOverallUptakeReceivedFollowTestsAll', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_GT_1000_COPIES_RECEIVED_FOLLOW_TESTS_ALL_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
