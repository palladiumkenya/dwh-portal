import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationNewByYear = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationNewByYear.lastFetchFiltered : getState().artOptimizationNewByYear.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationNewByYear.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationNewByYear.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationNewByYear.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationNewByYear.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationNewByYear.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationNewByYear.projects.sort()) &&
        _.isEqual(years.sort(), getState().artOptimizationNewByYear.years.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationNewByYear(counties, subCounties, facilities, partners, agencies, projects, years));
    }
};

export const fetchArtOptimizationNewByYear = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = [], years = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length || years.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_YEAR_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects, years }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects, year: years };
    const response = await getAll('care-treatment/getArtOptimizationNewByYear', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_NEW_BY_YEAR_FETCH, payload: { filtered, list: response }});
    }
};
