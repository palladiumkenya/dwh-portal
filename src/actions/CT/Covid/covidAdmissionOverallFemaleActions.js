import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidOverallAdmissionFemales = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidOverallAdmissionFemales());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidOverallAdmissionFemale.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidOverallAdmissionFemales());
        }
    }
};

export const fetchCovidOverallAdmissionFemales = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_ADMISSION_OVERALL_FEMALE_REQUEST });
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
    const response = await getAll('care-treatment/getCovidOverallAdmissionFemales', params);
    dispatch({ type: actionTypes.CT_COVID_ADMISSION_OVERALL_FEMALE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};

