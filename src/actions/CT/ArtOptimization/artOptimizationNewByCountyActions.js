import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationNewByCounty = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationNewByCounty.lastFetchFiltered : getState().artOptimizationNewByCounty.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationNewByCounty.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationNewByCounty.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationNewByCounty.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationNewByCounty.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationNewByCounty.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationNewByCounty.projects.sort()) &&
        _.isEqual(years.sort(), getState().artOptimizationNewByCounty.years.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationNewByCounty(counties, subCounties, facilities, partners, agencies, projects, years));
    }
};

export const fetchArtOptimizationNewByCounty = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_COUNTY_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects, years }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects, year: [2020] };
    const response = await getAll('care-treatment/getArtOptimizationNewByCounty', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_COUNTY_FETCH, payload: { filtered, list: response }});
    }
};
