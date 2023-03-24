import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadDsdAppointmentDurationByCounty = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().dsdAppointmentDurationByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'dsd' && tab !== 'dsd') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchDsdAppointmentDurationByCounty());
    }
};

export const fetchDsdAppointmentDurationByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_DSD_APPOINTMENT_DURATION_BY_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : '',
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : '',
    };
    const response = await getAll('care-treatment/dsdAppointmentDurationByCounty', params);
    dispatch({ type: actionTypes.CT_DSD_APPOINTMENT_DURATION_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
