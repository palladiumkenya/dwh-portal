import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import moment from 'moment';
import { CACHING } from '../../../constants';

export const load12MonthSuppressionByYearOfArtStart = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoad12MonthSuppressionByYearOfArtStart.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetch12MonthSuppressionByYearOfArtStart());
    }
};

export const fetch12MonthSuppressionByYearOfArtStart = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_12_MONTH_SUPPRESSION_BY_YEAR_OF_ART_START_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects
    };
    const response = await getAll('care-treatment/get12MonthViralSuppressionByYearOfArtStart', params);
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_12_MONTH_SUPPRESSION_BY_YEAR_OF_ART_START_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
