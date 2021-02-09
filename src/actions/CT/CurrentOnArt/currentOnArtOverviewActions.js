import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrentOnArtOverview = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currentOnArtOverview.lastFetch),
        'minutes'
    );
    if (
        getState().ui.ctTab !== 'txCurr' &&
        getState().ui.ctTab !== 'dsd' &&
        getState().ui.currentPage !== PAGES.home
    ) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrentOnArtOverview());
    }
};

export const fetchCurrentOnArtOverview = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_OVERVIEW_REQUEST });
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
    const response = await getAll('care-treatment/viralLoadCascade', params);
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_OVERVIEW_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
