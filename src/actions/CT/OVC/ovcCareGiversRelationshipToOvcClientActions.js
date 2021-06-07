import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOvcCareGiversRelationshipToOvcClient = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().ovcCareGiversRelationshipToOvcClient.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOvcCareGiversRelationshipToOvcClient());
    }
}

export const fetchOvcCareGiversRelationshipToOvcClient = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OVC_CAREGIVERS_RELATIONSHIP_TO_OVC_CLIENT_REQUEST });
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
    const response = await getAll('care-treatment/getOvcCareGiversRelationshipToOvcClient', params);
    dispatch({ type: actionTypes.CT_OVC_CAREGIVERS_RELATIONSHIP_TO_OVC_CLIENT_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
