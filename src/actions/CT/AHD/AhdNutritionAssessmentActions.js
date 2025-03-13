import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadAhdNutritionAssessment = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().ahdNutritionAssessment.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchAhdNutritionAssessment());
    }
}

export const fetchAhdNutritionAssessment = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.AHD_NUTRITION_ASSESSMENT_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll('care-treatment/getAHDNutritionAssessment', params);
    dispatch({ type: actionTypes.AHD_NUTRITION_ASSESSMENT_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
