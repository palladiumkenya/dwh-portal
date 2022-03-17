import moment from 'moment';
import { CACHING, PAGES } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOvcClientsExitReasons = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().ovcClientsExitReasons.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc' &&
        getState().ui.currentPage !== PAGES.ct) {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOvcClientsExitReasons());
    }
}

export const fetchOvcClientsExitReasons = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OVC_CLIENTS_EXIT_REASONS_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getOvcClientsExitReasons', params);
    dispatch({ type: actionTypes.CT_OVC_CLIENTS_EXIT_REASONS_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
