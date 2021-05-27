import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzEnrollmentAmongAlhivOnArtByCounty = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzEnrollmentAmongAlhivOnArtByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzEnrollmentAmongAlhivOnArtByCounty());
    }
}

export const fetchOtzEnrollmentAmongAlhivOnArtByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_ENROLLMENT_AMONG_ALHIV_ON_ART_BY_COUNTY_REQUEST });
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
    const response = await getAll('care-treatment/getOtzEnrollmentsByCounty', params);
    dispatch({ type: actionTypes.CT_OTZ_ENROLLMENT_AMONG_ALHIV_ON_ART_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
