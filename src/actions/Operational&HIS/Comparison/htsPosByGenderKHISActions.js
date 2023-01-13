import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadHTSPosByGenderKHIS = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().htsPosByGenderKHIS.lastFetch),
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
        await dispatch(fetchHTSPosByGenderKHIS());
    }
};

export const fetchHTSPosByGenderKHIS = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.KHIS_HTS_POS_BY_GENDER_REQUEST });
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
            : moment().subtract(2, 'month').add(17, 'days').format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : moment().subtract(2, 'month').add(17, 'days').format('MM'),
    };
    const response = await getAll(
        'operational-his/getKHISHTSPOSPositive',
        params
    );
    dispatch({
        type: actionTypes.KHIS_HTS_POS_BY_GENDER_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
