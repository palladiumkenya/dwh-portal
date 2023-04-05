import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadServiceDeskOpenByCounty = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().openByCounty.lastFetch),
        'minutes'
    );

    if (
        getState().ui.currentPage !== PAGES.sd
    ) {
        return;
    } else if (
        diffInMinutes < CACHING.MID &&
        getState().filters.filtered === false
    ) {
        return;
    } else {
        await dispatch(fetchServiceDesk());
    }
};

export const fetchServiceDesk = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.SERVICE_DESK_OPEN_BY_COUNTY_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        year: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('YYYY')
            : moment().subtract(1, 'month').format('YYYY'),
        month: getState().filters.fromDate
            ? moment(getState().filters.fromDate, 'MMM YYYY').format('MM')
            : moment().subtract(1, 'month').format('MM'),
    };
    const response = await getAll(
        'operational-his/getOpenIssuesByCounty',
        params
    );
    dispatch({ type: actionTypes.SERVICE_DESK_OPEN_BY_COUNTY_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
