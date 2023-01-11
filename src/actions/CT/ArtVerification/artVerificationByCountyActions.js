import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadArtVerificationByCounty = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtVerificationByCounty());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artVerificationByCounty.lastFetch),
            'minutes'
        );
        
        await dispatch(fetchArtVerificationByCounty());
        
    }
};

export const fetchArtVerificationByCounty =
    () => async (dispatch, getState) => {
        dispatch({ type: actionTypes.ART_VERIFICATION_BY_COUNTY_REQUEST });
        const params = {
            county: getState().filters.counties,
            subCounty: getState().filters.subCounties,
            facility: getState().filters.facilities,
            partner: getState().filters.partners,
            agency: getState().filters.agencies,
            project: getState().filters.projects,
            year: getState().filters.fromDate
                ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
                : '',
            month: getState().filters.fromDate
                ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
                : '',
        };
        const response = await getAll(
            'care-treatment/getArtVerificationByCounty',
            params
        );
        dispatch({
            type: actionTypes.ART_VERIFICATION_BY_COUNTY_FETCH,
            payload: { filtered: getState().filters.filtered, list: response },
        });
    };
