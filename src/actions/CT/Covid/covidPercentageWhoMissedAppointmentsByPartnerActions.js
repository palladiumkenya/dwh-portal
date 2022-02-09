import * as actionTypes from '../../types';
import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCovidPercentageWhoMissedAppointmentsByPartner = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCovidPercentageWhoMissedAppointmentsByPartner());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().CovidPercentageMissedAppointmentsByPartner.lastFetch),
            'minutes'
        );
        if (
            getState().ui.ctTab !== 'covid' &&
            getState().ui.currentPage !== PAGES.home
        ) {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCovidPercentageWhoMissedAppointmentsByPartner());
        }
    }
};

export const fetchCovidPercentageWhoMissedAppointmentsByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_COVID_PERCENTAGE_MISSED_APPOINTMENTS_BY_PARTNER_REQUEST });
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
    const response = await getAll('care-treatment/getCovidPercentageWhoMissedAppointmentsByPartner', params);
    dispatch({ type: actionTypes.CT_COVID_PERCENTAGE_MISSED_APPOINTMENTS_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
