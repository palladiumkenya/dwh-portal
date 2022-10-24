import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadLinkagePositiveTrends = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().linkagePositiveTrends.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'newlyOnArt' &&
        getState().ui.currentPage !== PAGES.ct &&
        getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchLinkagePositiveTrends());
    }
};

export const fetchLinkagePositiveTrends = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.HTS_LINKAGE_POSITIVE_TRENDS_REQUEST });
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
        fromDate: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYYMM')
            : moment().subtract(14, 'month').format('YYYYMM'),
        toDate: getState().filters.toDate
            ? moment(getState().filters.toDate, 'MMM YYYY').format('YYYYMM')
            : moment().subtract(2, 'month').add(17, 'days').format('YYYYMM'),
    };
    const response = await getAll('hts/linkageNumberPositive', params);
    dispatch({ type: actionTypes.HTS_LINKAGE_POSITIVE_TRENDS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
