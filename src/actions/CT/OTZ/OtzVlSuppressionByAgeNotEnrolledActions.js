import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOtzVlSuppressionByAgeNotEnrolled = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().otzVlSuppressionByAgeNotEnrolled.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOtzVlSuppressionByAge());
    }
}

export const fetchOtzVlSuppressionByAge = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_VL_SUPPRESSION_NOT_ENROLLED_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll(
        'care-treatment/getOtzVlSuppressionAmongAlhivNotEnrolledInOtzByAge',
        params
    );
    dispatch({
        type: actionTypes.CT_OTZ_VL_SUPPRESSION_NOT_ENROLLED_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
