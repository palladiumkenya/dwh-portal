import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationNewByPartner = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationNewByPartner.lastFetchFiltered : getState().artOptimizationNewByPartner.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationNewByPartner.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationNewByPartner.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationNewByPartner.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationNewByPartner.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationNewByPartner.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationNewByPartner.projects.sort()) &&
        _.isEqual(years.sort(), getState().artOptimizationNewByPartner.years.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationNewByPartner(counties, subCounties, facilities, partners, agencies, projects, years));
    }
};

export const fetchArtOptimizationNewByPartner = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects, years }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects, year: [2020] };
    const response = await getAll('care-treatment/getArtOptimizationNewByPartner', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_PARTNER_FETCH, payload: { filtered, list: response }});
    }
};
