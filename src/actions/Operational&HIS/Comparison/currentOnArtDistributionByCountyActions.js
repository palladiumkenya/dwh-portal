import moment from 'moment';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';

export const loadCurrentOnArtDistributionByCountyDWH = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currOnArtDWHByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    } else if (
        diffInMinutes < CACHING.MID &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchCurrentOnArtDistributionByCountyDWH());
    }
};

export const fetchCurrentOnArtDistributionByCountyDWH = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DWH_CURR_ON_ART_BY_COUNTY_REQUEST });
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
    const response = await getAll('operational-his/getTxCurrDWHCounty', params);
    dispatch({
        type: actionTypes.DWH_CURR_ON_ART_BY_COUNTY_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
