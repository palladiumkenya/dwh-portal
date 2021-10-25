import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidPercentageWhoMissedAppointmentsByAgeGroup = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidPercentageWhoMissedAppointmentsByAgeGroup());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidPercentageMissedAppointmentsByAgeGroup.lastFetch),
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
            await dispatch(fetchCovidPercentageWhoMissedAppointmentsByAgeGroup());
        }
    }
};

export const fetchCovidPercentageWhoMissedAppointmentsByAgeGroup = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_PERCENTAGE_MISSED_APPOINTMENTS_BY_AGE_REQUEST });
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
    const response = await getAll('care-treatment/getCovidPercentageWhoMissedAppointmentsByAgeGroup', params);
    dispatch({ type: actionTypes.CT_COVID_PERCENTAGE_MISSED_APPOINTMENTS_BY_AGE_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
