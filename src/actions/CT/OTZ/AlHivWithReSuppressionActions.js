import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadAlHivWithReSuppression = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().alHivWithReSuppression.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'otz' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    // }
    // else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
    //     return;
    } else {
        await dispatch(fetchOtzOutcomesAmongAlHivWithReSuppression());
    }
}

export const fetchOtzOutcomesAmongAlHivWithReSuppression = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OTZ_CALHIV_WITH_RESUPRESSION_REQUEST });
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
        'care-treatment/getAlhivWithReSuppression',
        params
    );
    dispatch({ type: actionTypes.CT_OTZ_CALHIV_WITH_RESUPRESSION_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
