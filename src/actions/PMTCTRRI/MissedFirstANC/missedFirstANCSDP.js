import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, PAGES } from '../../../constants';
import { getAll } from '../../../views/Shared/Api';

export const loadMissedFirstANCSDP = () => async (dispatch, getState) => {
    const lastFetch = getState().missedFirstANCSDP.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (getState().ui.currentPage !== PAGES.pmtctRRI) return;
    else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    )
        return;
    await dispatch(fetchMissedFirstANC());
};

export const fetchMissedFirstANC = () => async (dispatch, getState) => {
    const previousMonth = moment()
        .subtract(2, 'month')
        .add(15, 'days');
    dispatch({
        type: actionTypes.PMTCT_RRI_MISSED_FIRST_ANC_PARTNER_REQUEST,
    });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        emr: getState().filters.emr,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : previousMonth.format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : previousMonth.format('MM'),
    };
    try {
        const response = await getAll('pmtct-rri/getMissedANCBySDP', params);
        dispatch({
            type: actionTypes.PMTCT_RRI_MISSED_FIRST_ANC_PARTNER_FETCH,
            payload: {
                filtered: getState().filters.filtered,
                list: response,
            },
        });
    } catch (e) {
        dispatch({
            type: actionTypes.PMTCT_RRI_MISSED_FIRST_ANC_PARTNER_FAILED,
        });
    }
};
