import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationCurrentByAgeSex = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async (dispatch, getState) => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    const lastFetch = filtered ? getState().artOptimizationCurrentByAgeSex.lastFetchFiltered : getState().artOptimizationCurrentByAgeSex.lastFetchUnfiltered;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if ((diffInMinutes < CACHING.LONG) && filtered === false) {
        return;
    } else if (
        (diffInMinutes < CACHING.LONG) &&
        filtered === true &&
        _.isEqual(counties.sort(), getState().artOptimizationCurrentByAgeSex.counties.sort()) &&
        _.isEqual(subCounties.sort(), getState().artOptimizationCurrentByAgeSex.subCounties.sort()) &&
        _.isEqual(facilities.sort(), getState().artOptimizationCurrentByAgeSex.facilities.sort()) &&
        _.isEqual(partners.sort(), getState().artOptimizationCurrentByAgeSex.partners.sort()) &&
        _.isEqual(agencies.sort(), getState().artOptimizationCurrentByAgeSex.agencies.sort()) &&
        _.isEqual(projects.sort(), getState().artOptimizationCurrentByAgeSex.projects.sort())
    ) {
        return;
    } else {
        await dispatch(fetchArtOptimizationCurrentByAgeSex(counties, subCounties, facilities, partners, agencies, projects));
    }
};

export const fetchArtOptimizationCurrentByAgeSex = (counties = [], subCounties = [], facilities = [], partners = [], agencies = [], projects = []) => async dispatch => {
    const filtered = (counties.length || subCounties.length || facilities.length || partners.length || agencies.length || projects.length) ? true : false;
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_AGE_SEX_REQUEST, payload: { filtered, counties, subCounties, facilities, partners, agencies, projects }});
    const params = { county: counties, subCounty: subCounties, facility: facilities, partner: partners, agency: agencies, project: projects };
    const response = await getAll('care-treatment/getArtOptimizationCurrentByAgeSex', params);
    if (response.length) {
        dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_AGE_SEX_FETCH, payload: { filtered, list: response }});
    }
};
