import moment from 'moment';
import { CACHING } from '../../../constants';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';

export const loadOvcServBySex = () => async (dispatch, getState) => {
    const diffInMinutes = moment().diff(
        moment(getState().ovcServByGender.lastFetch),
        'minutes'
    );
    if (getState().ui.ctTab !== 'ovc') {
        return;
    }
    else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
        return;
    } else {
        await dispatch(fetchOvcServBySex());
    }
}

export const fetchOvcServBySex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_OVC_SERV_BY_GENDER_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        year: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("YYYY") : '',
        month: getState().filters.fromDate ? moment(getState().filters.fromDate, "MMM YYYY").format("MM") : '',
    };
    const response = await getAll('care-treatment/getOvcServBySex', params);
    dispatch({ type: actionTypes.CT_OVC_SERV_BY_GENDER_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
