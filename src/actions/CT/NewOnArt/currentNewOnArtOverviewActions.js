import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrentNewOnArtOverview = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currentNewOnArtOverview.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'newlyOnArt' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrentNewOnArtOverview());
    }
};

export const fetchCurrentNewOnArtOverview = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_NEW_ON_ART_OVERVIEW_REQUEST });
    const previousMonth = moment().startOf('month').subtract(1, 'month');
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : previousMonth.format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : previousMonth.format("MM"),
    };
    const response = await getAll('care-treatment/getNewlyStartedDesegregated', params);
    dispatch({ type: actionTypes.CT_CURRENT_NEW_ON_ART_OVERVIEW_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
