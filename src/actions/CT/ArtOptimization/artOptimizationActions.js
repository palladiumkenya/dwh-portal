import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationOverview = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationOverview.lastFetchFiltered : getState().artOptimizationOverview.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationOverview.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationOverview.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationOverview.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationOverview.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationOverview.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationOverview.projects.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationOverview(counties, subCounties, facilities, partners, agencies, projects));
    }
};

export const fetchArtOptimizationOverview = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects };
    const response = await getAll('care-treatment/getArtOptimizationOverview', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_FETCH, payload: { filtered, list: response }});
    }
};
