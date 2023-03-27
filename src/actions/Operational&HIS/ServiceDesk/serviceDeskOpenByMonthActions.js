import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadServiceDeskOpenByMonth = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().openByMonth.lastFetch),
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
    dispatch({ type: actionTypes.SERVICE_DESK_OPEN_BY_MONTH_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        year: getState().filters.fromDate  ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : null,
        month: getState().filters.fromDate  ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : null,
    };
    const response = await getAll(
        'operational-his/getOpenIssuesByMonth',
        params
    );
    dispatch({ type: actionTypes.SERVICE_DESK_OPEN_BY_MONTH_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
