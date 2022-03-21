import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadCALHIVTotalOnMMD = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().CALHIVTotalOnMMD.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCALHIVTotalOnMDD());
    }
}

export const fetchCALHIVTotalOnMDD = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CALHIV_TOTAL_ON_MMD_REQUEST });
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
    const response = await getAll('care-treatment/getCALHIVTotalOnMMD', params);
    dispatch({ type: actionTypes.CT_CALHIV_TOTAL_ON_MMD_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
