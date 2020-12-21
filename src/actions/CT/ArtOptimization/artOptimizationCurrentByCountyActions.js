import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationCurrentByCounty = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationCurrentByCounty.lastFetchFiltered : getState().artOptimizationCurrentByCounty.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationCurrentByCounty.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationCurrentByCounty.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationCurrentByCounty.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationCurrentByCounty.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationCurrentByCounty.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationCurrentByCounty.projects.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationCurrentByCounty(counties, subCounties, facilities, partners, agencies, projects));
    }
};

export const fetchArtOptimizationCurrentByCounty = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_COUNTY_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects };
    const response = await getAll('care-treatment/getArtOptimizationCurrentByCounty', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_COUNTY_FETCH, payload: { filtered, list: response }});
    }
};
