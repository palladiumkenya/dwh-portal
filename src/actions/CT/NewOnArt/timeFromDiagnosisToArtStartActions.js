import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadTimeFromDiagnosisToArtStart = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().timeFromDiagnosisToArtStart.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txNew' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchTimeFromDiagnosisToArtStart());
    }
};

export const fetchTimeFromDiagnosisToArtStart = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_TIME_FROM_DIAGNOSIS_TO_ART_START_REQUEST });
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
    const response = await getAll('care-treatment/timeToArt', params);
    dispatch({ type: actionTypes.CT_TIME_FROM_DIAGNOSIS_TO_ART_START_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
