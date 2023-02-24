import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadArtVerificationReasons = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtVerificationReasons());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artVerificationReasons.lastFetch),
            'minutes'
        );
        
        await dispatch(fetchArtVerificationReasons());
    
    }
};

export const fetchArtVerificationReasons =
    () => async (dispatch, getState) => {
        dispatch({ type: actionTypes.ART_VERIFICATION_REASONS_REQUEST });
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
            'care-treatment/getArtVerificationReasons',
            params
        );
        dispatch({
            type: actionTypes.ART_VERIFICATION_REASONS_FETCH,
            payload: { filtered: getState().filters.filtered, list: response },
        });
    };
