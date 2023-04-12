import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadAppointmentKeepingWaterfall = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().appointmentKeepingWaterfall.lastFetch),
        'minutes'
    );
    if (
        getState().ui.ctTab !== 'treatmentOutcomes' &&
        tab !== 'treatmentOutcomes'
    ) {
        return;
    } else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchIIT());
    }
};

export const fetchIIT = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_APPOINTMENT_KEEPING_WATERFALL_REQUEST });
    const previousMonth = moment().startOf('month').subtract(2, 'month').add(17, 'days');
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        fromDate: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format(
                  'YYYY-MM-DD'
              )
            : previousMonth.format('YYYY-MM-DD'),
        toDate: getState().filters.toDate
            ? moment(getState().filters.toDate, 'MMM YYYY')
                  .endOf('month')
                  .format('YYYY-MM-DD')
            : previousMonth.endOf('month').format('YYYY-MM-DD'),
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : previousMonth.format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : previousMonth.format('MM'),
    };
    const response = await getAll(
        'care-treatment/getAppointmentKeepingWaterfall',
        params
    );
    dispatch({
        type: actionTypes.CT_APPOINTMENT_KEEPING_WATERFALL_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
