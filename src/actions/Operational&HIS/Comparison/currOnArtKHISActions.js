import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadCurrOnARTKHIS = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currOnArtKHIS.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrOnARTKHIS());
    }
};

export const fetchCurrOnARTKHIS = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : moment().subtract(2, 'month').add(15, 'days').format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") :  moment().subtract(2, 'month').add(15, 'days').format("MM"),
    };
    const response = await getAll('operational-his/txCurrKHIS', params);
    dispatch({ type: actionTypes.KHIS_CURR_ON_ART_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
