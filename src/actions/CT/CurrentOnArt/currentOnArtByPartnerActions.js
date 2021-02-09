import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadCurrentOnArtByPartner = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().currentOnArtByPartner.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'txCurr') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchCurrentOnArtByPartner());
    }
};

export const fetchCurrentOnArtByPartner = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_PARTNER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/txCurrDistributionByPartner', params);
    dispatch({ type: actionTypes.CT_CURRENT_ON_ART_BY_PARTNER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
