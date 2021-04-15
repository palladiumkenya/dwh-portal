import axios from 'axios';
import moment from 'moment';
import * as actionTypes from '../types';
import { CACHING, HRH_API_URL } from '../../constants';

export const loadPopulationByCounty = () => async (dispatch, getState) => {
    const lastFetch = getState().populationByCounty.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < CACHING.LONG) return;
    await dispatch(fetchPopulationByCounty());
};

export const fetchPopulationByCounty = () => async dispatch => {
    dispatch({ type: actionTypes.HRH_POPULATION_BY_COUNTY_REQUEST });
    try {
        const response = await axios.get(`${HRH_API_URL}/counties`);
        dispatch({ type: actionTypes.HRH_POPULATION_BY_COUNTY_FETCH, payload: response.data.counties });
    } catch (e) {
        dispatch({ type: actionTypes.HRH_POPULATION_BY_COUNTY_REQUEST_FAILED });
    }
};
