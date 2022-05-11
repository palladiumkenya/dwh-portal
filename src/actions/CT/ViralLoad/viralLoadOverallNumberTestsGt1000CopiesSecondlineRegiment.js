import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';
import {
    loadViralLoadOverallUptakeGt1000CopiesReceivedFollowTests
} from './viralLoadOverallUptakeGt1000CopiesReceivedFollowTests';
import { CT_VIRAL_LOAD_OVERALL_UPTAKE_GT_1000_COPIES_SECOND_LINE_REGIMENT_REQUEST } from '../../types';
import viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment
    from '../../../reducers/CT/ViralLoad/viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment';

export const loadViralLoadOverallNumberGt1000CopiesSecondlineRegiment = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadOverallNumberTestsGt1000CopiesSecondlineRegiment.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadOverallNumberGt1000CopiesSecondlineRegiment());
    }
};

export const fetchViralLoadOverallNumberGt1000CopiesSecondlineRegiment = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_GT_1000_COPIES_SECOND_LINE_REGIMENT_REQUEST });
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
    const response = await getAll('care-treatment/getVlOverallNumberGt1000CopiesSecondlineRegiment', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_OVERALL_UPTAKE_GT_1000_COPIES_SECOND_LINE_REGIMENT_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
