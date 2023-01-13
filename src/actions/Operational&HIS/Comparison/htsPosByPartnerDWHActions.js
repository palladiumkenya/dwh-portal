import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadHTSPosByPartnerDWH = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().htsPosByPartnerDWH.lastFetch),
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
        await dispatch(fetchHTSPosByPartnerDWH());
    }
};

export const fetchHTSPosByPartnerDWH = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.DWH_HTS_POS_BY_PARTNER_REQUEST });
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
        'operational-his/getDWHHTSPOSByPartner',
        params
    );
    dispatch({
        type: actionTypes.DWH_HTS_POS_BY_PARTNER_FETCH,
        payload: { filtered: getState().filters.filtered, list: response },
    });
};
