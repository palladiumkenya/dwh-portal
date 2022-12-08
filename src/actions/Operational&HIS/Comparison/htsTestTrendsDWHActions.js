import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadHTSTesthtsTestTrendsDWH = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().htsTestTrendsDWH.lastFetch),
        'minutes'
    );

    if (getState().ui.currentPage !== PAGES.operationalHIS) {
        return;
    } else if (
        diffInMinutes < CACHING.MID &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchHTSTesthtsTestTrendsDWH());
    }
};

export const fetchHTSTesthtsTestTrendsDWH = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DWH_HTS_TEST_TRENDS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : '',
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : '',
    };
    const response = await getAll(
        'operational-his/getDWHHTSTestTrends',
        params
    );
    dispatch({
        type: actionTypes.DWH_HTS_TEST_TRENDS_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
