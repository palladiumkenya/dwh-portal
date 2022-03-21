import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzOutcomesByYearOfArtStart = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzOutcomesByYearOfArtStart.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzOutcomesByYearOfArtStart());
    }
}

export const fetchOtzOutcomesByYearOfArtStart = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_OUTCOMES_BY_YEAR_OF_ART_START_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getOtzOutcomesByYearOfArtStart', params);
    dispatch({ type: actionTypes.CT_OTZ_OUTCOMES_BY_YEAR_OF_ART_START_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
