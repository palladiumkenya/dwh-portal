import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadViralLoadCategorizationUToU = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().viralLoadCategorizationUToU.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'vl' &&
        tab !== 'vl') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchViralLoadCategorizationUToU());
    }
};

export const fetchViralLoadCategorizationUToU = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_VIRAL_LOAD_CATEGORIZATION_U_TO_U_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        pbfw: getState().filters.pbfws,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
    };
    const response = await getAll(
        'care-treatment/vlCategorizationUToU',
        params
    );
    dispatch({
        type: actionTypes.CT_VIRAL_LOAD_CATEGORIZATION_U_TO_U_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
