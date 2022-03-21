import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidSeverityByGender = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidSeverityByGender());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidSeverityByGender.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home &&
            getState().ui.currentPage !== PAGES.ct
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidSeverityByGender());
        }
    }
};

export const fetchCovidSeverityByGender = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_SEVERITY_BY_GENDER_REQUEST });
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
    const response = await getAll('care-treatment/getCovidSeverityByGender', params);
    dispatch({ type: actionTypes.CT_COVID_SEVERITY_BY_GENDER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};

