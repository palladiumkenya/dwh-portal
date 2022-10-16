import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzEnrollmentAmongAlhivOnArtBySex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzEnrollmentAmongAlhivOnArtBySex.lastFetch),
        'minutes'
    );
    if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzEnrollmentAmongAlhivOnArtBySex());
    }
}

export const fetchOtzEnrollmentAmongAlhivOnArtBySex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_ENROLLMENT_AMONG_ALHIV_ON_ART_BY_SEX_REQUEST });
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
    const response = await getAll('care-treatment/getOtzEnrollmentsBySex', params);
    dispatch({ type: actionTypes.CT_OTZ_ENROLLMENT_AMONG_ALHIV_ON_ART_BY_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
