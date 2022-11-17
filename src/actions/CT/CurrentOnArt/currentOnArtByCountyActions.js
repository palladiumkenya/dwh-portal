import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadCurrentOnArtByCounty = (tab) => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchCurrentOnArtByCounty());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().currentOnArtByCounty.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== "currentOnArt" &&
            getState().ui.ctTab !== "artOptimization" &&
            getState().ui.ctTab !== 'dsd' &&
            tab !== 'dsd' &&
            tab !== "currentOnArt" &&
            tab !== "comparison" &&
            tab !== "artOptimization") {
            return;
        }
        else if ((diffInMinutes < CACHING.MID) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchCurrentOnArtByCounty());
        }
    }
};

export const fetchCurrentOnArtByCounty = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        datimAgePopulations: getState().filters.datimAgePopulation,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : '',
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : '',
    };
    const response = await getAll('care-treatment/txCurrDistributionByCounty', params);
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
