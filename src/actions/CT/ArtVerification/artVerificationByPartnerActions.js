import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadArtVerificationByPartner = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtVerificationByPartner());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artVerificationByPartner.lastFetch),
            'minutes'
        );
        
        await dispatch(fetchArtVerificationByPartner());
        
    }
};

export const fetchArtVerificationByPartner =
    () => async (dispatch, getState) => {
        dispatch({ type: actionTypes.ART_VERIFICATION_BY_PARTNER_REQUEST });
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
            'care-treatment/getArtVerificationByPartner',
            params
        );
        dispatch({
            type: actionTypes.ART_VERIFICATION_BY_PARTNER_FETCH,
            payload: { filtered: getState().filters.filtered, list: response },
        });
    };
