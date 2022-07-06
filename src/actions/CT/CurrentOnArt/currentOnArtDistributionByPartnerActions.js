import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadCurrentOnArtDistributionByPartner = (tab) => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currentOnArtDistributionByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'currentOnArt' && getState().ui.ctTab !== 'dsd' &&
        tab !== 'comparison' && tab !== 'dsd') {
        return;
    } else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrentOnArtDistributionByPartner());
    }
};

export const fetchCurrentOnArtDistributionByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_DISTRIBUTION_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY') : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM') : ''
    };
    const response = await getAll('care-treatment/getTxCurrAgeGroupDistributionByPartner', params);
    dispatch({
        type: actionTypes.CT_CURRENT_ON_ART_DISTRIBUTION_BY_PARTNER_FETCH,
        payload: { filtered: getState().filters.filtered, list: response }
    });
};
