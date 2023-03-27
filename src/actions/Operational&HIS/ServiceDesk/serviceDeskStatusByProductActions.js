import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING, PAGES } from '../../../constants';

export const loadServiceDeskStatusByProduct = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().statusByProduct.lastFetch),
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
    dispatch({ type: actionTypes.SERVICE_DESK_STATUS_BY_PRODUCT_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : moment().format("YYYY"),
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") :  moment().format("MM"),
    };
    const response = await getAll(
        'operational-his/getIssueStatusByProduct',
        params
    );
    dispatch({ type: actionTypes.SERVICE_DESK_STATUS_BY_PRODUCT_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
