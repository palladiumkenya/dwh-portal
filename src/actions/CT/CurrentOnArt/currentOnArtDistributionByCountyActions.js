import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadCurrentOnArtDistributionByCounty = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currentOnArtDistributionByCounty.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txCurr' && getState().ui.ctTab !== 'dsd') {
        return;
    }
    else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrentOnArtDistributionByCounty());
    }
};

export const fetchCurrentOnArtDistributionByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_DISTRIBUTION_BY_COUNTY_REQUEST });
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
    const response = await getAll('care-treatment/getTxCurrAgeGroupDistributionByCounty', params);
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_DISTRIBUTION_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
