import moment from 'moment';
import * as actionTypes from '../../types';
import { CACHING, PAGES } from '../../../constants';
import { getAll } from '../../../views/Shared/Api';

export const loadMissedDTG = () => async (dispatch, getState) => {
    const lastFetch = getState().missedDTG.lastFetch;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (getState().ui.currentPage !== PAGES.pmtctRRI) return;
    else if (
        diffInMinutes < CACHING.LONG &&
        getState().filters.filtered === false
    )
        return;
    await dispatch(fetchMissedDTG());
};

export const fetchMissedDTG = () => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.PMTCT_RRI_MISSED_DTG_REQUEST,
    });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        emr: getState().filters.emr,
        // datimAgeGroup: getState().filters.datimAgeGroups,
        // year: getState().filters.fromDate
        //     ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
        //     : previousMonth.format('YYYY'),
        // month: getState().filters.fromDate
        //     ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
        //     : previousMonth.format('MM'),
    };
    try {
        const response = await getAll('pmtct-rri/getMissedDTG', params);
        dispatch({
            type: actionTypes.PMTCT_RRI_MISSED_DTG_FETCH,
            payload: {
                filtered: getState().filters.filtered,
                list: response,
            },
        });
    } catch (e) {
        dispatch({
            type: actionTypes.PMTCT_RRI_MISSED_DTG_FAILED,
        });
    }
};
