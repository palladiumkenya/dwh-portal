import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzVlSuppressionByCountyNotEnrolled = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzVlSuppressionByCountyNotEnrolled.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    // }
    // else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
    //     return;
    } else {
        await dispatch(fetchOtzVlSuppressionBySex());
    }
}

export const fetchOtzVlSuppressionBySex = () => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.CT_OTZ_VL_SUPPRESSION_NOT_ENROLLED_BY_COUNTY_REQUEST,
    });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups
    };
    const response = await getAll(
        'care-treatment/getOtzVlSuppressionAmongAlhivNotEnrolledInOtzByCounty',
        params
    );
    dispatch({
        type: actionTypes.CT_OTZ_VL_SUPPRESSION_NOT_ENROLLED_BY_COUNTY_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
